import { toast } from "sonner";

export const ErrorHandler = (error: Error) => {
	toast.error(error.message || "An unexpected error occurred. Please try again later.");
};
