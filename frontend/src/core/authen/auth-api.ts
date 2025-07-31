import { authClient } from "@/global/lib/utils";
import type { User } from "@/global/stores/auth-store";

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

export const getMe = async (): Promise<User> => {
    const { data: session } = await authClient.getSession()
    if (!session?.user) {
        throw new Error("User not authenticated");
    }
    return session?.user as User;
};

export const logout = async () => {
    const response = await authClient.signOut();
    return response;
}