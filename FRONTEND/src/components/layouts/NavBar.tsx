import * as React from "react";

import AppBar from "@mui/material/AppBar";
import { Badge } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Link as RouterLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useBoundStore } from "../../stores/useBoundStore";

function ResponsiveAppBar() {
	const cartCount = useBoundStore((state) => state.cartCount);

	return (
		<AppBar position="static">
			<Container>
				<Toolbar disableGutters>
					<PhotoCameraIcon />
					<Typography
						variant="h6"
						ml={1}
						noWrap
						component={RouterLink}
						to="/"
						sx={{
							mr: 2,
							display: "flex",
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
							flexGrow: 1,
						}}>
						PHOTO PORTAL
					</Typography>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Kosár">
							<IconButton size="large" color="inherit">
								<Badge badgeContent={cartCount} color="secondary">
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
