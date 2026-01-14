import { LocaleObject, printValue } from "yup";

const translations: Required<LocaleObject> = {
	mixed: {
		default: "Érvénytelen ${path}",
		required: "${path} kitöltése kötelező.",
		defined: "${path} megadása kötelező.",
		notNull: "${path} nem lehet null.",
		oneOf: "${path} értéke az alábbiak közül kell, hogy legyen: ${values}",
		notOneOf: "${path} nem lehet az alábbiak között: ${values}",
		notType: ({ path, type, value, originalValue }) => {
			const castMsg =
				originalValue != null && originalValue !== value
					? ` (cast from the value \`${printValue(originalValue, true)}\`).`
					: ".";

			return type !== "mixed"
				? `${path} must be a \`${type}\` type, ` +
						`but the final value was: \`${printValue(value, true)}\`` +
						castMsg
				: `${path} must match the configured type. ` +
						`The validated value was: \`${printValue(value, true)}\`` +
						castMsg;
		},
	},
	string: {
		length: "${path} pontosan ${length} karakter kell, hogy legyen",
		min: "${path} legalább ${min} karakter lehet",
		max: "${path} maxiumum ${max} karakter lehet",
		matches: '${path} nem felel meg ennek: "${regex}"',
		email: "${path} nem érvényes email",
		url: "${path} nem érvényes URL",
		uuid: "${path} nem érvényes UUID",
		trim: "${path} nem trimmed szöveg",
		lowercase: "${path} csak kisbetűket tartalmazhat",
		uppercase: "${path} csak nagybetűket tartalmazhat",
	},
	number: {
		min: "${path} nagyobb vagy egyenlő kell, hogy legyen mint ${min}",
		max: "${path} kisebb vagy egyenlőnek kell lennie mint ${max}",
		lessThan: "${path} kevesebb kell, hogy legyen mint ${less}",
		moreThan: "${path} nagyobb kell, hogy legyen mint ${more}",
		positive: "${path} pozitív szám kell, hogy legyen",
		negative: "${path} negatív szám kell, hogy legyen",
		integer: "${path} egész szám kell, hogy legyen",
	},
	date: {
		min: "${path} később kell legyen mint ${min}",
		max: "${path} korábban kell legyen mint ${max}",
	},
	boolean: {
		isValue: "${path} mezőnek ${value}-nak kell lennie",
	},
	object: {
		noUnknown: "${path} field has unspecified keys: ${unknown}",
	},
	array: {
		min: "${path} field must have at least ${min} items",
		max: "${path} field must have less than or equal to ${max} items",
		length: "${path} must have ${length} items",
	},
	tuple: {
		notType: (params) => {
			const { path, value, spec } = params;
			const typeLen = spec.types.length;
			if (Array.isArray(value)) {
				if (value.length < typeLen)
					return `${path} tuple value has too few items, expected a length of ${typeLen} but got ${
						value.length
					} for value: \`${printValue(value, true)}\``;
				if (value.length > typeLen)
					return `${path} tuple value has too many items, expected a length of ${typeLen} but got ${
						value.length
					} for value: \`${printValue(value, true)}\``;
			}

			//return ValidationError.formatError(mixed.notType, params);
		},
	},
};

export default translations;
