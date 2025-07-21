import axios, { AxiosError } from "axios";
import { API_URL } from "@/config/constants";
import { AuthStore } from "@/stores/auth";
import type { ApiErrorResponse } from "@/types/response";

const api = axios.create({
	baseURL: API_URL,
	headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError<ApiErrorResponse>) => {
		if (error.response && error.response.status === 401) {
			AuthStore.getState().logout();
		}
		return Promise.reject(error);
	}
);

export default api;
