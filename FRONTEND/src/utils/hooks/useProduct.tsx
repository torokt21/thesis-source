import Product from "../types/Product";
import useApiResource from "./useApiResource";

const useProduct = (id: number) => {
	return useApiResource<Product>({
		url: "Product/" + id,
		dtoMapper: (p) => p,
	});
};

export default useProduct;
