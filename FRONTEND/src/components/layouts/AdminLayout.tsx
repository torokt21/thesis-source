import * as React from "react";

import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import { Link, Navigate, Outlet } from "react-router-dom";
import { ListItemButton, Tooltip } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Box from "@mui/material/Box";
import CameraIndoorIcon from "@mui/icons-material/CameraIndoor";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import RedeemIcon from "@mui/icons-material/Redeem";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { SupervisedUserCircle } from "@mui/icons-material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ViewListIcon from "@mui/icons-material/ViewList";
import { grey } from "@mui/material/colors";
import { useBoundStore } from "../../stores/useBoundStore";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
		boxSizing: "border-box",
		...(open && {
			...openedMixin(theme),
			"& .MuiDrawer-paper": openedMixin(theme),
		}),
		...(!open && {
			...closedMixin(theme),
			"& .MuiDrawer-paper": closedMixin(theme),
		}),
	})
);

export default function AdminLayout() {
	const isLoggedIn = useBoundStore((s) => s.isLoggedIn());
	const user = useBoundStore((s) => s.user);
	const logout = useBoundStore((s) => s.logout);
	const theme = useTheme();

	const open = useBoundStore().sidebarOpen;
	const toggleSidebarOpen = useBoundStore().toggleSidebar;

	if (!isLoggedIn) return <Navigate to="/admin/login" />;

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={toggleSidebarOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}>
						<MenuIcon />
					</IconButton>
					<PhotoCameraIcon />
					<Typography ml={2} variant="h6" noWrap component="div">
						Photo Portal
					</Typography>

					<Box sx={{ flexGrow: 1, textAlign: "right" }}>
						<Typography display="inline-block" mr={1}>
							Üdv, {user?.username}
						</Typography>
						<Typography color={grey[400]} display="inline-block" mr={1}>
							({user?.roles.join(", ")})
						</Typography>
						<Tooltip title="Kijelentkezés">
							<IconButton color="inherit" onClick={logout}>
								<LogoutIcon />
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader>
					<IconButton onClick={toggleSidebarOpen}>
						{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemLink
							to="/admin"
							primary="Irányítópult"
							open={open}
							icon={<SpaceDashboardIcon />}
						/>
					</ListItem>
					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemLink
							to="/admin/order"
							primary="Rendelések"
							open={open}
							icon={<ViewListIcon />}
						/>
					</ListItem>
					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemLink
							to="/admin/upload"
							primary="Feltöltés"
							open={open}
							icon={<AddAPhotoIcon />}
						/>
					</ListItem>
				</List>
				<Divider />
				<List>
					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemLink
							to="/admin/institution"
							primary="Intézmények"
							open={open}
							icon={<CameraIndoorIcon />}
						/>
					</ListItem>

					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemLink
							to="/admin/product"
							primary="Szolgáltatások"
							open={open}
							icon={<FreeBreakfastIcon />}
						/>
					</ListItem>

					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemLink
							to="/admin/package"
							primary="Csomagok"
							open={open}
							icon={<RedeemIcon />}
						/>
					</ListItem>
				</List>

				{/* ADMIN MENÜ */}
				<Divider />
				<List>
					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemLink
							to="/admin/users"
							primary="Felhasználók"
							open={open}
							icon={<SupervisedUserCircle />}
						/>
					</ListItem>

					<ListItem disablePadding sx={{ display: "block" }}>
						<ListItemLink
							to="/admin/settings"
							primary="Beállítások"
							open={open}
							icon={<SettingsApplicationsIcon />}
						/>
					</ListItem>
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Outlet />
			</Box>
		</Box>
	);
}

interface ListItemLinkProps {
	icon?: React.ReactElement;
	primary: string;
	to: string;
	open: boolean;
}

function ListItemLink(props: ListItemLinkProps) {
	const { icon, primary, to } = props;

	return (
		<ListItemButton
			component={Link}
			to={to}
			sx={{
				minHeight: 48,
				justifyContent: props.open ? "initial" : "center",
				px: 2.5,
			}}>
			{icon ? (
				<ListItemIcon
					sx={{
						minWidth: 0,
						mr: props.open ? 3 : "auto",
						justifyContent: "center",
					}}>
					{icon}
				</ListItemIcon>
			) : null}
			<ListItemText primary={primary} sx={{ opacity: props.open ? 1 : 0 }} />
		</ListItemButton>
	);
}
