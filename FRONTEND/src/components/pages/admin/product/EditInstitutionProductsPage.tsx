import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { PrintProductType } from "../../../../utils/types/Product";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import { useBoundStore } from "../../../../stores/useBoundStore";
import useInstitution from "../../../../utils/hooks/useInstitution";
import useProducts from "../../../../utils/hooks/useProducts";

const columns: GridColDef[] = [
	{ field: "Name", headerName: "Név", width: 300, sortable: true },
	{
		field: "Type",
		headerName: "Típus",
		width: 130,
		sortable: true,
		valueGetter: (params: GridValueGetterParams) => PrintProductType(params.row.Type),
	},
	{
		field: "Visible",
		headerName: "Elérhetőség",
		width: 130,
		sortable: true,
		valueGetter: (params: GridValueGetterParams) =>
			params.row.Orderable ? "Rendelhető" : "Nem rendelhető",
	},
];

export default function EditInstitutionProductsPage() {
	const { institutionId } = useParams();
	const userId = useBoundStore().user?.id;

	const {
		data: [institution, instLoading, instError],
		refetch,
	} = useInstitution(Number(institutionId));

	const [selectedIds, setSelectedIds] = useState<number[]>([]);
	const {
		data: [products, loading, error],
	} = useProducts();

	useEffect(() => {
		if (!institution) return;
		setSelectedIds(institution.OrderableProducts.map((o) => o.Id));
	}, [institution?.Id]);

	function handleSubmit() {
		useAxiosClient()
			.post(
				process.env.REACT_APP_API_URL + "OrderableProduct/" + institutionId,
				JSON.stringify({ Products: selectedIds })
			)
			.then(refetch);
	}

	if (loading || instLoading) return <CircularProgress />;

	if (error || instError || !institution || !products) return <>Váratlan hiba</>;

	if (institution.PhotographerId != userId) <Navigate to="/admin/institution" />;

	return (
		<Container>
			<Box textAlign="left" my={3}>
				<Button component={Link} to="/admin/institution" variant="outlined">
					Vissza
				</Button>
			</Box>
			<Box mb={3}>
				<Grid container>
					<Grid item xs={12} sm={7} lg={10}>
						<Typography component="h1" variant="h3">
							Szolgáltatások ({institution.Name})
						</Typography>
					</Grid>
				</Grid>
			</Box>

			<div style={{ width: "100%" }}>
				<DataGrid
					rows={products}
					columns={columns}
					getRowId={(product) => product.Id}
					hideFooter={true}
					checkboxSelection
					rowSelectionModel={selectedIds}
					onRowSelectionModelChange={(ids) => {
						setSelectedIds(ids.map((i) => Number(i)));
					}}
				/>
			</div>
			<Box textAlign="right" mt={2}>
				<Button variant="contained" onClick={handleSubmit}>
					Mentés
				</Button>
			</Box>
		</Container>
	);
}
