//import { InstitutionDto } from "../dtos/InstitutionDto";

import Class from "../types/Class";
import useApiResource from "./useApiResource";

const useClasses = (institutionId: number) => {
	return useApiResource<Class[]>({ url: "Class/" + institutionId, dtoMapper: (x) => x });
};

export default useClasses;
