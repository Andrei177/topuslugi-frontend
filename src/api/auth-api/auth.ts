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