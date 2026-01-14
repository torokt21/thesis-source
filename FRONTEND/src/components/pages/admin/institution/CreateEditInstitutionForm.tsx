import "date-fns";

import { Box, Button, Grid } from "@mui/material";
import { DatePicker, TextField, makeValidate } from "mui-rff";
import { object, string } from "yup";

import { Form } from "react-final-form";
import Institution from "../../../../utils/types/Institution";
import React from "react";

const createInstitutionSchema = object<Institution>().shape({
	Name: string()
		.required("A név megadása kötelező")
		.min(3, "Legalább 3 karakter hosszúnak kell lennie!")
		.max(64, "A hossza nem haladhatja meg a 64 karaktert"),
	Shortcode: string()
		.required("A kód megadása kötelező")
		.uppercase("Csak nagybetűket tartalmazhat")
		.length(3, "A kód hossza 3 karakter kell, hogy legyen"),
	ContactInfo: string().nullable(),
	SoftDeadline: object().dayJs().required("A mező kitöltése kötelező"),
	HardDeadline: object().dayJs().required("A mező kitöltése kötelező"),
	ExpectedShippingStart: object().dayJs().required("A mező kitöltése kötelező"),
	ExpectedShippingEnd: object().dayJs().required("A mező kitöltése kötelező"),
	DisplayMessage: string().nullable(),
});

type CreateEditInstitutionFormProps = {
	editing: boolean;
	editingInstitution?: Institution;
	onSubmit: (institution: Institution) => void;
};

export default function CreateEditInstitutionForm(props: CreateEditInstitutionFormProps) {
	const validate = makeValidate(createInstitutionSchema);

	return (
		<Form
			onSubmit={props.onSubmit}
			validate={validate}
			initialValues={props.editingInstitution}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} md={3}>
							<TextField
								fullWidth
								label="Azonosító kód"
								name="Shortcode"
								required={true}
								inputProps={{
									onChange: (
										e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
									) => {
										e.target.value = e.target.value.toUpperCase();
									},
								}}
							/>
						</Grid>
						<Grid item xs={12} md={9}>
							<TextField fullWidth label="Név" name="Name" required={true} />
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								rows={4}
								label="Kontakt infó, megjegyzések"
								multiline
								name="ContactInfo"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker
								label="Megjelenített rendelési határidő"
								name="SoftDeadline"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker label="Valódi rendelési határidő" name="HardDeadline" />
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker
								label="Várható kiszállítás (tól)"
								name="ExpectedShippingStart"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DatePicker
								label="Várható kiszállítás (ig)"
								name="ExpectedShippingEnd"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								fullWidth
								rows={4}
								label="Üzenet a képek fölött"
								multiline
								name="DisplayMessage"
							/>
						</Grid>
					</Grid>
					<Box my={3} textAlign="center">
						<Button variant="contained" color="primary" onClick={handleSubmit}>
							{props.editing ? "Mentés" : "Létrehozás"}
						</Button>
					</Box>
				</form>
			)}
		/>
	);
}
