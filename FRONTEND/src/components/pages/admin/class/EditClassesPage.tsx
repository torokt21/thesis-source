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
	TableRow,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { Link, Navigate, useParams } from "react-router-dom";
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Class from "../../../../utils/types/Class";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxiosClient } from "../../../../utils/hooks/useAxiosClient";
import { useBoundStore } from "../../../../stores/useBoundStore";
import useClasses from "../../../../utils/hooks/useClasses";
import useInstitution from "../../../../utils/hooks/useInstitution";

export default function EditClassesPage() {
	const { institutionId } = useParams();
	const userId = useBoundStore().user?.id;

	const {
		data: [institution, instLoading, instError],
	} = useInstitution(Number(institutionId));

	const {
		data: [classes, classesLoading, classesError],
		refetch,
	} = useClasses(Number(institutionId));

	function handleDelete(clas: Class) {
		if (confirm(`Biztosan törölni akarod a(z) ${clas.Name} nevű osztályt?`)) {
			useAxiosClient()
				.delete(process.env.REACT_APP_API_URL + "Class/" + clas.Id)
				.then(() => refetch());
		}
	}

	if (instLoading || classesLoading) return <CircularProgress />;

	if (instError || classesError || !institution || !classes) return <>Váratlan hiba</>;

	if (institution.PhotographerId !== userId) return <Navigate to={`/admin/institution`} />;

	return (
		<Container maxWidth="sm">
			{" "}
			<Box textAlign="left" my={3}>
				<Button component={Link} to="/admin/institution" variant="outlined">
					Vissza
				</Button>
			</Box>
			<Typography variant="h3" component="h1">
				{institution?.Name}
			</Typography>
			<Typography variant="h5" component="h2" mb={2}>
				Osztályok szerkesztése ({classes.length})
			</Typography>
			<Box my={4}>
				<AddClassForm refetch={refetch} institutionId={institution.Id} classes={classes} />
			</Box>
			<TableContainer component={Paper}>
				<Table>
					<TableBody>
						{classes.map((clas) => (
							<TableRow>
								<TableCell align="left">{clas.Name}</TableCell>
								<TableCell align="right">
									{" "}
									<Tooltip title="Törlés">
										<IconButton onClick={() => handleDelete(clas)}>
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

type AddClassFormProps = {
	refetch: () => void;
	institutionId: number;
	classes: Class[];
};

function AddClassForm(props: AddClassFormProps) {
	const [newClassName, setNewClassName] = useState("");

	function handleAddClass() {
		if (newClassName.length < 1) return alert("Az osztály neve túl rövid.");
		if (props.classes.some((c) => c.Name.toLowerCase() === newClassName.toLowerCase()))
			return alert("A megadott osztály már létezik.");
		useAxiosClient()
			.post(
				process.env.REACT_APP_API_URL + "Class",
				JSON.stringify({ name: newClassName.trim(), institutionId: props.institutionId })
			)
			.then(() => {
				setNewClassName("");
				props.refetch();
			})
			.catch(() => alert("Sikertelen hozzáadás"));
	}

	return (
		<Paper>
			<Box pb={2} px={2}>
				<Grid container spacing={2} alignItems="center" direction="row">
					<Grid item xs={12} md={8}>
						<TextField
							fullWidth
							size="small"
							label="Új osztály"
							value={newClassName}
							onChange={(e) => setNewClassName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<Button
							fullWidth
							onClick={handleAddClass}
							variant="contained"
							startIcon={<AddIcon />}>
							Hozzáadás
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Paper>
	);
}
