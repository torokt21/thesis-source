import {
	Box,
	Button,
	CircularProgress,
	Container,
	Grid,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PackageInformation from "../../../../utils/types/PackageInformation";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import { useBoundStore } from "../../../../stores/useBoundStore";
import usePackageInformations from "../../../../utils/hooks/usePackageInformations";

export default function ListPackageInformationsPage() {
	const navigate = useNavigate();
	const {
		data: [packages, loading, error],
		refetch,
	} = usePackageInformations();

	function handleDelete(package_: PackageInformation) {
		if (confirm(`Biztosan törölni akarod a(z) ${package_.Name} nevű terméket?`)) {
			useAxiosClient()
				.delete(process.env.REACT_APP_API_URL + "Package/" + package_.Id)
				.then(() => refetch());
		}
	}

	function handleEdit(package_: PackageInformation) {
		navigate(package_.Id.toString());
	}

	const hasRole = useBoundStore().hasRole("Admin");
	if (!hasRole) return <Navigate to="/admin" />;

	if (error)
		return (
			<Box textAlign="center">
				<Typography>Váratlan hiba</Typography>
			</Box>
		);

	if (loading)
		return (
			<Box m={5} textAlign="center">
				<CircularProgress />
			</Box>
		);

	return (
		<Container>
			<Box mb={3}>
				<Grid container>
					<Grid item xs={12} sm={7} lg={10}>
						<Typography component="h1" variant="h3">
							Csomagok
						</Typography>
					</Grid>

					<Grid item xs={12} sm={5} lg={2} textAlign="right">
						<Button
							fullWidth
							component={Link}
							to="new"
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}>
							Új csomag
						</Button>
					</Grid>
				</Grid>
			</Box>

			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="Intézmények listája">
					<TableHead>
						<TableRow>
							<TableCell component="th"></TableCell>
							<TableCell component="th" sx={{ fontWeight: "bold" }}>
								Név
							</TableCell>
							<TableCell component="th" sx={{ fontWeight: "bold" }}>
								Ár
							</TableCell>
							<TableCell component="th" align="right" sx={{ fontWeight: "bold" }}>
								Műveletek
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{packages?.map((package_) => (
							<TableRow
								key={package_.Id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell width="50px">
									{package_.Orderable ? (
										<Tooltip title="Rendelhető">
											<VisibilityIcon />
										</Tooltip>
									) : (
										<Tooltip title="Nem rendelhető">
											<VisibilityOffIcon />
										</Tooltip>
									)}
								</TableCell>
								<TableCell scope="row">{package_.Name}</TableCell>
								<TableCell scope="row">
									{package_.Price.toLocaleString("hu-HU")} Ft
								</TableCell>
								<TableCell align="right" width="200px">
									<Tooltip title="Szerkesztés">
										<IconButton onClick={() => handleEdit(package_)}>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Törlés">
										<IconButton onClick={() => handleDelete(package_)}>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
