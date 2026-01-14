import PackageInformation from "../types/PackageInformation";
import useApiResource from "./useApiResource";

const usePackage = (id: number) => {
	return useApiResource<PackageInformation>({
		url: "Package/" + id,
		dtoMapper: (p) => p,
	});
};

export default usePackage;
