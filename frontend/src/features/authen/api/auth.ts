import { authClient } from "@/lib/utils";

export const loginByEmail = async (email: string, password: string) => {
	const response = await authClient.signIn.email({
		email,
		password,
	});
	return response;
};

export const registerByEmail = async (name: string, email: string, password: string) => {
	const response = await authClient.signUp.email({
		name,
		email,
		password,
	});
	return response;
};

export const logout = async () => {
	const response = await authClient.signOut();
	return response;
}