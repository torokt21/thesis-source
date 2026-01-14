import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
	palette: {
		background: {
			default: "#fafafa",
		},
	},
	typography: {
		h1: {
			fontSize: "3rem",
		},
		h2: {
			fontSize: "2.5rem",
		},
		h3: {
			fontSize: "2rem",
		},
		h4: {
			fontSize: "1.6rem",
		},
		h5: {
			fontSize: "1.4rem",
		},
		h6: {
			fontSize: "1.2rem",
		},
	},
});

export default Theme;
