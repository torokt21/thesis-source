import { Box, Button, CircularProgress, Container, Paper, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

import { AxiosError } from "axios";
import CreateEditPackageForm from "./CreateEditPackageForm";
import PackageInformation from "../../../../utils/types/PackageInformation";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import usePackage from "../../../../utils/hooks/usePackageInformation";

export default function EditPackagePage() {
	const { id } = useParams();
	const [updateError, setError] = useState<string | undefined>();
	const navigate = useNavigate();

	const {
		data: [package_, loading, error],
	} = usePackage(Number(id));

	function onSubmit(
		values: PackageInformation,
		packageRequirement: { quantity: number; productId: number }[]
	) {
		setError(undefined);
		const client = useAxiosClient();
		client
			.put(process.env.REACT_APP_API_URL + "Package/" + id, JSON.stringify(values))
			.then(() =>
				client
					.put(
						process.env.REACT_APP_API_URL + `Package/${id}/Requirements`,
						JSON.stringify({ requirements: packageRequirement })
					)
					.then(() => navigate("/admin/package"))
			)
			.catch((error: AxiosError) => {
				if (error.response?.status === 400) setError(error.response.data as string);
			});
	}

	if (loading) return <CircularProgress />;

	if (error) return <>Váratlan hiba</>;

	return (
		<Container>
			<Box textAlign="left" my={3}>
				<Button component={Link} to="/admin/package" variant="outlined">
					Vissza
				</Button>
			</Box>

			<Paper>
				<Box p={4}>
					<Typography variant="h3" component="h1" mb={2}>
						Csomag szerkesztése
					</Typography>

					{updateError && (
						<Box textAlign="center" color="red" my={3}>
							{updateError}
						</Box>
					)}

					<CreateEditPackageForm
						editing={true}
						editingPackage={package_}
						onSubmit={onSubmit}
					/>
				</Box>
			</Paper>
		</Container>
	);
}
