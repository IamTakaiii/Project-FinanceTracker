import { authClient } from "@/global/lib/utils";
import type { User } from "@/global/stores/auth-store";

export const loginByEmail = async (email: string, password: string) => {
    const response = await authClient.signIn.email({
        email,
        password,
    });
    if (response.error) {
        throw new Error(response.error.message || "Login failed");
    }
    return response;
};

export const registerByEmail = async (name: string, email: string, password: string) => {
    const response = await authClient.signUp.email({
        name,
        email,
        password,
    });
    if (response.error) {
        throw new Error(response.error.message || "Registration failed");
    }
    return response;
};

export const getMe = async (): Promise<User> => {
    const { data: session, error } = await authClient.getSession()
    if (!session?.user) {
        throw new Error("User not authenticated");
    }
    if (error) {
        throw new Error("Failed to fetch user data");
    }
    return session?.user as User;
};

export const logout = async () => {
    const response = await authClient.signOut();
    if (response.error) {
        throw new Error(response.error.message || "Logout failed");
    }
    return response;
}