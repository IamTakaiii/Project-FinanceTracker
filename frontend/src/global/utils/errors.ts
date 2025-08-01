import { toast } from "sonner";

export const ErrorHandler = (error: Error | unknown) => {
	toast.error((error as Error).message || "An unexpected error occurred. Please try again later.");
};
