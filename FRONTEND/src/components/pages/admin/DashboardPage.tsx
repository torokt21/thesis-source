import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import { LineChart } from "@mui/x-charts";
import React from "react";

export default function DashboardPage() {
	return (
		<Container>
			<Typography my={4} variant="h1">
				Irányítópult
			</Typography>

			<Box>
				<Grid container spacing={2}>
					<Grid item xs={12} md={8}>
						<Paper sx={{ padding: 3 }}>
							<Typography variant="h5">Statisztika</Typography>
							<LineChart
								xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
								series={[
									{
										label: "Rendelések száma",
										data: [12, 30, 25, 22, 41, 52],
									},
								]}
								height={300}
							/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper sx={{ padding: 3 }}>
							<Typography variant="h5">Rendelések</Typography>
						</Paper>
					</Grid>

					<Grid item xs={12} md={4}>
						<Paper sx={{ padding: 3 }}>
							<Typography variant="h5">Intézmények</Typography>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Paper sx={{ padding: 3 }}>
							<Typography variant="h5">Határidők</Typography>
						</Paper>
					</Grid>

					<Grid item xs={12} md={4}>
						<Paper sx={{ padding: 3 }}>
							<Typography variant="h5">Figyelmeztetések</Typography>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}
