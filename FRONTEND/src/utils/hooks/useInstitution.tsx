//import { InstitutionDto } from "../dtos/InstitutionDto";

import Class from "../types/Class";
import Institution from "../types/Institution";
import Product from "../types/Product";
import dayjs from "dayjs";
import useApiResource from "./useApiResource";

export type InstitutionDto = {
	Id: number;
	Name: string;
	Shortcode: string;
	ContactInfo: string;
	PhotographerId: string;
	SoftDeadline: Date;
	HardDeadline: Date;
	ExpectedShippingStart: Date;
	ExpectedShippingEnd: Date;
	DisplayMessage: string;
	Classes: Class[];
	OrderableProducts: Product[];
};

export function institutionMapper(response: InstitutionDto): Institution {
	return {
		Id: response.Id,
		Name: response.Name,
		Shortcode: response.Shortcode,
		ContactInfo: response.ContactInfo,
		PhotographerId: response.PhotographerId,
		SoftDeadline: dayjs(response.SoftDeadline),
		HardDeadline: dayjs(response.HardDeadline),
		ExpectedShippingStart: dayjs(response.ExpectedShippingStart),
		ExpectedShippingEnd: dayjs(response.ExpectedShippingEnd),
		DisplayMessage: response.DisplayMessage,
		Classes: response.Classes,
		OrderableProducts: response.OrderableProducts,
	};
}

const useInstitution = (id: number) => {
	return useApiResource<Institution, InstitutionDto>({
		url: "Institution/" + id,
		dtoMapper: institutionMapper,
	});
};

export default useInstitution;
