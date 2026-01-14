/* eslint-disable @typescript-eslint/no-explicit-any */
// Source: https://github.com/jquense/yup/issues/312#issuecomment-745034006

import * as yup from "yup";

import { AnyObject, Flags, Maybe, Schema } from "yup";

import dayjs from "dayjs";

yup.addMethod(yup.object, "dayJs", function method(message) {
	return this.test("dayJs", message, function validate(value) {
		if (!value) {
			return true;
		}
		return dayjs.isDayjs(value);
	});
});

declare module "yup" {
	interface ObjectSchema<
		TIn extends Maybe<AnyObject>,
		TContext = AnyObject,
		TDefault = any,
		TFlags extends Flags = ""
	> extends Schema<TIn, TContext, TDefault, TFlags> {
		dayJs(): this;
	}
}

export default yup;
