import "dayjs/locale/hu";
import "./utils/types/yup-extended";

import { Route, Routes } from "react-router-dom";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AdminLayout from "./components/layouts/AdminLayout";
import CreateInstitutionPage from "./components/pages/admin/institution/CreateInstitutionPage";
import CreatePackagePage from "./components/pages/admin/package/CreatePackagePage";
import CreateProductPage from "./components/pages/admin/product/CreateProductPage";
import { CssBaseline } from "@mui/material";
import DashboardPage from "./components/pages/admin/DashboardPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import EditClassesPage from "./components/pages/admin/class/EditClassesPage";
import EditInstitutionPage from "./components/pages/admin/institution/EditInstitutionPage";
import EditInstitutionProductsPage from "./components/pages/admin/product/EditInstitutionProductsPage";
import EditPackagePage from "./components/pages/admin/package/EditPackagePage";
import EditProductPage from "./components/pages/admin/product/EditProductPage";
import HomePage from "./components/pages/user/home/HomePage";
import ListInstitutions from "./components/pages/admin/institution/ListInstitutionsPage";
import ListPackageInformationsPage from "./components/pages/admin/package/ListPackageInformationsPage";
import ListProductsPage from "./components/pages/admin/product/ListProductsPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import LoginPage from "./components/pages/admin/auth/LoginPage";
import NotFoundPage from "./components/pages/error/NotFoundPage";
import React from "react";
import Theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";
import { setLocale as setYupLocale } from "yup";
import translations from "./utils/yup-locale";

function App() {
	setYupLocale(translations);
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="hu">
			<ThemeProvider theme={Theme}>
				<CssBaseline />
				<Routes>
					<Route index element={<HomePage />} />
					<Route path="admin">
						<Route path="login" element={<LoginPage />} />
						<Route element={<AdminLayout />}>
							<Route index element={<DashboardPage />} />
							<Route path="institution">
								<Route index element={<ListInstitutions />} />
								<Route path=":id" element={<EditInstitutionPage />} />
								<Route
									path=":institutionId/classes"
									element={<EditClassesPage />}
								/>
								<Route
									path=":institutionId/products"
									element={<EditInstitutionProductsPage />}
								/>
								<Route path="new" element={<CreateInstitutionPage />} />
							</Route>
							<Route path="product">
								<Route index element={<ListProductsPage />} />
								<Route path=":id" element={<EditProductPage />} />

								<Route path="new" element={<CreateProductPage />} />
							</Route>

							<Route path="package">
								<Route index element={<ListPackageInformationsPage />} />
								<Route path=":id" element={<EditPackagePage />} />

								<Route path="new" element={<CreatePackagePage />} />
							</Route>
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Route>
					<Route element={<DefaultLayout />}>
						<Route path="*" element={<NotFoundPage />} />
					</Route>
				</Routes>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export default App;
