export type ApiResponse<T> = {
	success: true;
	message: string;
	data: T;
};

export type ApiErrorResponse = {
	success: false;
	message: string;
	errors?: Record<string, string[]>;
};

export type ApiResponseWithPagination<T> = {
	success: true;
	message: string;
	data: T[];
	pagination: {
		count: number;
		next?: string | null;
		previous?: string | null;
	};
};
