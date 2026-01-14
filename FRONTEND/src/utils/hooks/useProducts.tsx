import Product from "../types/Product";
import useApiResource from "./useApiResource";

const useProducts = () => {
	return useApiResource<Product[]>({
		url: "Product",
		dtoMapper: (p) => p,
	});
};

export default useProducts;
