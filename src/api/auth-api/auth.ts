import { AuthLogin, AuthSignup, AuthVerify } from "@/api/auth-api/types"
import { $privateApi, $publicApi } from "../api"

type AuthResponse = {
    detail: string
}

export const verifyEmail = async ({email, password, isNewAcc} : AuthVerify) => {
    const response = await $publicApi.post<AuthResponse>(`/email/verification-code?is_new_account=${isNewAcc}`, {
        email,
        password
    })
    return response
}

export const login = async ({email, password, emailCode} : AuthLogin) => {
    const response = await $publicApi.post<AuthResponse>("/auth/login", 
        {
            email,
            password,
            email_code: emailCode
        },
        {
            withCredentials: true
        }
    )
    return response
}

export const signup = async ({email, password, emailCode, firstName} : AuthSignup) => {
    const response = await $publicApi.post<AuthResponse>("/auth/signup", 
        {
            email,
            password,
            email_code: emailCode,
            first_name: firstName
        },
        {
            withCredentials: true
        }
    )
    return response
}

export const resetPassword = async (email: string) => {
    const response = await $publicApi.post("/email/reset-password", {
        email
    })
    return response
}

export const updatePassword = async (password: string, retryPassword: string, key: string) => {
    const response = await $publicApi.post(`/auth/reset-password/${key}`, {
        password,
        password_reset: retryPassword
    })
    return response
}

export const refreshTokens = async () => {
    const response = await $privateApi.post("/jwt/refresh", {})
    return response
}