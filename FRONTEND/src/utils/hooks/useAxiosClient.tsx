import axios from "axios";
import { useBoundStore } from "../../stores/useBoundStore";

export function useAxiosClient() {
	const client = axios.create();
	const token = useBoundStore.getState().user?.authToken;
	const logout = useBoundStore.getState().logout;

	client.interceptors.request.use(
		(config) => {
			if (token) {
				config.headers.Authorization = "Bearer " + token;
				config.headers["Content-Type"] = "application/json";
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	client.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response.status === 401) logout();
			return Promise.reject(error);
		}
	);

	return client;
}
