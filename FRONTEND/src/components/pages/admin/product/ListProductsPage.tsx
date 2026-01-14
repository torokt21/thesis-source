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
import Product, { PrintProductType } from "../../../../utils/types/Product";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import { useBoundStore } from "../../../../stores/useBoundStore";
import useProducts from "../../../../utils/hooks/useProducts";

export default function ListProductsPage() {
	const navigate = useNavigate();
	const {
		data: [products, loading, error],
		refetch,
	} = useProducts();

	function handleDelete(product: Product) {
		if (confirm(`Biztosan törölni akarod a(z) ${product.Name} nevű terméket?`)) {
			useAxiosClient()
				.delete(process.env.REACT_APP_API_URL + "Product/" + product.Id)
				.then(() => refetch());
		}
	}

	function handleEdit(Product: Product) {
		navigate(Product.Id.toString());
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
							Szolgáltatások
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
							Új szolgáltatás
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
								Típus
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
						{products?.map((product) => (
							<TableRow
								key={product.Id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell width="50px">
									{product.Orderable ? (
										<Tooltip title="Rendelhető">
											<VisibilityIcon />
										</Tooltip>
									) : (
										<Tooltip title="Nem rendelhető">
											<VisibilityOffIcon />
										</Tooltip>
									)}
								</TableCell>
								<TableCell scope="row">{product.Name}</TableCell>
								<TableCell scope="row">{PrintProductType(product.Type)}</TableCell>
								<TableCell scope="row">
									{product.Price.toLocaleString("hu-HU")} Ft
								</TableCell>
								<TableCell align="right" width="200px">
									<Tooltip title="Szerkesztés">
										<IconButton onClick={() => handleEdit(product)}>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title="Törlés">
										<IconButton onClick={() => handleDelete(product)}>
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
