import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

import { AxiosError } from "axios";
import CreateEditInstitutionForm from "./CreateEditInstitutionForm";
import Institution from "../../../../utils/types/Institution";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";

export default function CreateInstitutionPage() {
	const [error, setError] = useState<string | undefined>();
	const navigate = useNavigate();

	function onSubmit(values: Institution) {
		setError(undefined);
		const client = useAxiosClient();
		client
			.post(process.env.REACT_APP_API_URL + "Institution", JSON.stringify(values))
			.then(() => navigate("/admin/institution"))
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) setError(error.response.data as string);
			});
	}

	return (
		<Container>
			<Box textAlign="left" my={3}>
				<Button component={Link} to="/admin/institution" variant="outlined">
					Vissza
				</Button>
			</Box>

			<Paper>
				<Box p={4}>
					<Typography variant="h3" component="h1" mb={2}>
						Új intézmény
					</Typography>

					{error && (
						<Box textAlign="center" color="red" my={3}>
							{error}
						</Box>
					)}

					<CreateEditInstitutionForm editing={false} onSubmit={onSubmit} />
				</Box>
			</Paper>
		</Container>
	);
}
