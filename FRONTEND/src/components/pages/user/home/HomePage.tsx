import {
	Avatar,
	Box,
	Button,
	Container,
	InputAdornment,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import CameraAltIcon from "@mui/icons-material/CameraAlt";
import TagIcon from "@mui/icons-material/Tag";
import { ValidOrderCode } from "../../../../utils/validators";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
	const [code, setCode] = useState("");
	const [valid, setValid] = useState(false);
	const [shownError, setShownError] = useState<string | undefined>(undefined);
	const navigate = useNavigate();

	// Validate the code
	useEffect(() => {
		const valid = ValidOrderCode(code);
		setValid(valid);

		if (valid) setShownError(undefined);
		else setShownError((e) => (code.length > 10 ? "Nem megfelelő formátum" : e));
	}, [code]);

	function handleSubmit() {
		if (!valid) {
			setShownError("Nem megfelelő formátum");
			return;
		}

		// TODO check if code exists
		const splitCode = code.split("-");
		navigate(`${splitCode[0]}/${splitCode[1]}`);
	}

	function handleCodeChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		setCode(e.target.value.toUpperCase().substring(0, 12));
	}

	return (
		<>
			<Box mt={12} mb={4} style={{ justifyContent: "center", display: "flex" }}>
				<Avatar sx={{ bgcolor: green[500], width: 50, height: 50 }}>
					<CameraAltIcon />
				</Avatar>
			</Box>
			<Container maxWidth="md">
				<Box sx={{ boxShadow: 3, backgroundColor: "white" }} p={3}>
					<Box pb={3} textAlign="center">
						<Typography variant="h3" component="h1" mb={5}>
							Üdvözlöm a webes rendelőfelületen!
						</Typography>

						<Typography component="h2">
							Kérem itt adja meg a kapott webes azonosító kódot!
						</Typography>

						<Container maxWidth="xs">
							<Box my={2}>
								<TextField
									label="Webes azonosító kód"
									value={code}
									onChange={handleCodeChange}
									error={!!shownError}
									helperText={shownError}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<TagIcon />
											</InputAdornment>
										),
									}}
								/>
							</Box>

							<Button
								onClick={handleSubmit}
								variant="contained"
								color="primary"
								type="submit">
								Lássam a képeket!
							</Button>
						</Container>
					</Box>
				</Box>
			</Container>
		</>
	);
}
