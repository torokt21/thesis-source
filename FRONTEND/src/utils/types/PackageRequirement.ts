import Product from "./Product";

type PackageRequirement = {
	Id: string;
	PackageInformationId: number;
	ProductId: number;
	Product: Product;
	Quantity: number;
};

export default PackageRequirement;
