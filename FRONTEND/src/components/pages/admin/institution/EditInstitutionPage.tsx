import { Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

import { AxiosError } from "axios";
import CreateEditInstitutionForm from "./CreateEditInstitutionForm";
import Institution from "../../../../utils/types/Institution";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import useInstitution from "../../../../utils/hooks/useInstitution";

export default function EditInstitutionPage() {
	const { id } = useParams();
	const [updateError, setError] = useState<string | undefined>();
	const navigate = useNavigate();

	const {
		data: [institution, loading, error],
	} = useInstitution(Number(id));

	function onSubmit(values: Institution) {
		setError(undefined);
		const client = useAxiosClient();
		client
			.put(process.env.REACT_APP_API_URL + "Institution/" + id, JSON.stringify(values))
			.then(() => navigate("/admin/institution"))
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) setError(error.response.data as string);
			});
	}

	if (loading) return <CircularProgress />;

	if (error) return <>Váratlan hiba</>;

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
						Intézmény szerkesztése
					</Typography>

					{updateError && (
						<Box textAlign="center" color="red" my={3}>
							{updateError}
						</Box>
					)}

					<CreateEditInstitutionForm
						editing={true}
						editingInstitution={institution}
						onSubmit={onSubmit}
					/>
				</Box>
			</Paper>
		</Container>
	);
}
