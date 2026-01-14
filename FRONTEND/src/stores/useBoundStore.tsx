import { AdminSlice, createAuthSlice } from "./authSlice";
import { CartSlice, createCartSlice } from "./cartSlice";
import { devtools, persist } from "zustand/middleware";

import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

//import zukeeper from "zukeeper";

export type AppState = AdminSlice & CartSlice;

export const useBoundStore = create<AppState>()(
	devtools(
		persist(
			(...a) => ({
				...createCartSlice(...a),
				...createAuthSlice(...a),
			}),
			{ name: "bound-store" }
		)
	)
);

if (process.env.NODE_ENV === "development") {
	mountStoreDevtool("Store", useBoundStore);
}
