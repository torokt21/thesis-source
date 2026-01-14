import { JwtPayload, jwtDecode } from "jwt-decode";

import { AppState } from "./useBoundStore";
import { StateCreator } from "zustand";
import axios from "axios";

export interface AdminSlice {
	user?: {
		authToken: string;
		username: string;
		id: string;
		displayname: string;
		expires: number;
		roles: string[];
	};

	/** Determines whether the admin sidebar is open. */
	sidebarOpen: boolean;

	/** Toggles the admin sidebar */
	toggleSidebar: () => void;

	/** Logs in the user */
	login: (loginResponse: LoginResponseDto) => void;

	/** Logs out the user */
	logout: () => void;
	isLoggedIn: () => boolean;

	hasRole: (role: string) => boolean;
}

export const createAuthSlice: StateCreator<AppState, [], [], AdminSlice> = (set, get) => ({
	user: undefined,

	sidebarOpen: true,

	toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

	login: (loginResponse: LoginResponseDto) => {
		set(() => {
			const decodedJwt = jwtDecode(loginResponse.token) as JwtPayload &
				Record<string, string | number | string[]>;

			return {
				user: {
					authToken: loginResponse.token as string,
					username: decodedJwt.nameid as string,
					id: decodedJwt.sub as string,
					displayname: decodedJwt.displayname as string,
					expires: decodedJwt.exp as number,
					roles:
						typeof decodedJwt.role === "string"
							? [decodedJwt.role]
							: (decodedJwt.role as string[]),
				},
			};
		});
	},
	isLoggedIn: () => {
		return !!get().user;
	},
	hasRole: (role: string) => get().isLoggedIn() && get().user!.roles.some((r) => r === role),
	logout: () =>
		set(() => {
			axios.post("https://localhost:44370/api/Auth/logout");
			return { user: undefined };
		}),
});

export interface LoginRequestDto {
	Username: string;
	Password: string;
}

export interface LoginResponseDto {
	expiration: string;
	id: string;
	token: string;
}
