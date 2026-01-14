import { AppState } from "./useBoundStore";
import { StateCreator } from "zustand";

export interface CartSlice {
	cartCount: number;
	addToCart: () => void;
}

export const createCartSlice: StateCreator<AppState, [], [], CartSlice> = (set) => ({
	cartCount: 1,
	addToCart: () => {
		set((state) => ({ cartCount: state.cartCount + 1 }));
	},
});
