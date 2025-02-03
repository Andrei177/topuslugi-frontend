import { Auth, AuthVerify } from "@/api/auth-api/types"
import { $privateApi, $publicApi } from "../api"

type AuthResponse = {
    detail: string
}


export const refreshTokens = async () => {
    const response = await $privateApi.post("/jwt/refresh", {})
    return response
}

export const verifyPhone = async ({phoneNumber} : AuthVerify) => {
    const response = await $publicApi.post<AuthResponse>("/sms", {
        phone_number: phoneNumber
    })
    return response
}

export const auth = async ({phoneNumber, smsCode} : Auth) => {
    const response = await $publicApi.post<AuthResponse>("/auth/login", 
        {
            phone_number: phoneNumber,
            sms_code: smsCode
        },
        {
            withCredentials: true
        }
    )
    return response
}

//всё что ниже пока не используется, так как Влад меняет логику
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