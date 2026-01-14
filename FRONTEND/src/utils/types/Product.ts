export type ProductType = "Printed" | "Gift";

export function PrintProductType(type: ProductType) {
	switch (type) {
		case "Gift":
			return "Ajándéktárgy";
		case "Printed":
			return "Papírkép";
		default:
			throw new Error("Ismeretlen típus.");
	}
}

type Product = {
	Id: number;
	Name: string;
	Description: string | null;
	PhotographerId: string;
	Price: number;
	Type: ProductType;
	Orderable: boolean;
};

export default Product;
