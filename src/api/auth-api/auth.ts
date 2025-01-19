import { AuthLogin, AuthSignup, AuthVerify } from "@/api/auth-api/types"
import { $publicApi } from "../api"

type AuthResponse = {
    detail: string
}

export const verifyEmail = async ({email, password} : AuthVerify) => {
    const response = await $publicApi.post<AuthResponse>("/email/verification-code", {
        email,
        password
    })
    return response
}

export const login = async ({email, password, emailCode} : AuthLogin) => {
    const response = await $publicApi.post<AuthResponse>("/auth/login", {
        email,
        password,
        email_code: emailCode
    })
    return response
}

export const signup = async ({email, password, emailCode, firstName} : AuthSignup) => {
    const response = await $publicApi.post<AuthResponse>("/auth/signup", {
        email,
        password,
        email_code: emailCode,
        first_name: firstName
    })
    return response
}

export const resetPassword = async (email: string) => {
    const response = await $publicApi.post("/email/reset-password", {
        email
    })
    return response
}

export const updatePassword = async (email: string, password: string, retryPassword: string, key: string) => {
    const response = await $publicApi.post(`/auth/reset-password/${key}`, {
        email,
        password,
        password_reset: retryPassword
    })
    return response
}