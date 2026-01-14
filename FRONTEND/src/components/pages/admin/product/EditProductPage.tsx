import { Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

import { AxiosError } from "axios";
import CreateEditProductForm from "./CreateEditProductForm";
import Product from "../../../../utils/types/Product";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import useProduct from "../../../../utils/hooks/useProduct";

export default function EditProductPage() {
	const { id } = useParams();
	const [updateError, setError] = useState<string | undefined>();
	const navigate = useNavigate();

	const {
		data: [product, loading, error],
	} = useProduct(Number(id));

	function onSubmit(values: Product) {
		setError(undefined);
		const client = useAxiosClient();
		client
			.put(process.env.REACT_APP_API_URL + "Product/" + id, JSON.stringify(values))
			.then(() => navigate("/admin/product"))
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) setError(error.response.data as string);
			});
	}

	if (loading) return <CircularProgress />;

	if (error) return <>Váratlan hiba</>;

	return (
		<Container>
			<Box textAlign="left" my={3}>
				<Button component={Link} to="/admin/product" variant="outlined">
					Vissza
				</Button>
			</Box>

			<Paper>
				<Box p={4}>
					<Typography variant="h3" component="h1" mb={2}>
						Termék szerkesztése
					</Typography>

					{updateError && (
						<Box textAlign="center" color="red" my={3}>
							{updateError}
						</Box>
					)}

					<CreateEditProductForm
						editing={true}
						editingProduct={product}
						onSubmit={onSubmit}
					/>
				</Box>
			</Paper>
		</Container>
	);
}
