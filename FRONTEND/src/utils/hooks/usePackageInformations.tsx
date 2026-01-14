import PackageInformation from "../types/PackageInformation";
import useApiResource from "./useApiResource";

const usePackageInformations = () => {
	return useApiResource<PackageInformation[]>({
		url: "Package",
		dtoMapper: (i) => i,
	});
};

export default usePackageInformations;
