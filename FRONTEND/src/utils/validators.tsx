export function ValidOrderCode(value: string) {
	const regex = new RegExp("^[a-zA-Z]{3}-[a-zA-Z0-9]{8}$", "i");
	return regex.test(value);
}
