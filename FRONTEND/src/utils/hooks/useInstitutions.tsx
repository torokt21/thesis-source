//import { InstitutionDto } from "../dtos/InstitutionDto";

import { InstitutionDto, institutionMapper } from "./useInstitution";

import Institution from "../types/Institution";
import useApiResource from "./useApiResource";

const useInstitutions = () => {
	return useApiResource<Institution[], InstitutionDto[]>({
		url: "Institution",
		dtoMapper: (insts) => insts.map((i) => institutionMapper(i)),
	});
};

export default useInstitutions;
