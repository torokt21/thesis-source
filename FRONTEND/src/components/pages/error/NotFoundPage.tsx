import { Box, Button, Typography } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
	const navigate = useNavigate();
	return (
		<Box my={12}>
			<Typography variant="h1" my={2}>
				Ajjaj...
			</Typography>
			<Typography my={2}>Ez az oldal nem létezik</Typography>
			<Button variant="outlined" onClick={() => navigate(-1)}>
				Vissza
			</Button>
		</Box>
	);
}
