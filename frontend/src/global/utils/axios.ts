import axios, { AxiosError } from "axios";
import { API_URL } from "@/global/config/constants";
import { useAuthStore } from "@/global/stores/auth-store";
import type { ApiErrorResponse } from "@/global/types/response";

const api = axios.create({
	baseURL: API_URL,
});

api.defaults.withCredentials = true;

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError<ApiErrorResponse>) => {
		if (error.response) {
			const { status, data } = error.response;
			if (status === 401) {
				useAuthStore.getState().logout();
			}
			return Promise.reject(data);
		}
		return Promise.reject(error);
	}
);

export default api;
