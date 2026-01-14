import { AxiosError, AxiosResponse } from "axios";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import CreateEditPackageForm from "./CreateEditPackageForm";
import PackageInformation from "../../../../utils/types/PackageInformation";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";

export default function CreatePackagePage() {
	const [error, setError] = useState<string | undefined>();
	const navigate = useNavigate();

	function onSubmit(
		values: PackageInformation,
		packageRequirement: { quantity: number; productId: number }[]
	) {
		setError(undefined);
		const client = useAxiosClient();
		client
			.post(process.env.REACT_APP_API_URL + "Package", JSON.stringify(values))
			.then((result: AxiosResponse) =>
				client
					.put(
						process.env.REACT_APP_API_URL + `Package/${result.data.id}/Requirements`,
						JSON.stringify({ requirements: packageRequirement })
					)
					.then(() => navigate("/admin/package"))
			)
			.then(() => navigate("/admin/package"))
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) setError(error.response.data as string);
			});
	}

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
						Új csomag
					</Typography>

					{error && (
						<Box textAlign="center" color="red" my={3}>
							{error}
						</Box>
					)}

					<CreateEditPackageForm editing={false} onSubmit={onSubmit} />
				</Box>
			</Paper>
		</Container>
	);
}
