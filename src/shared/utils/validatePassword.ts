type ResponseAfterValidate = {
    isValid: boolean
    message?: string
}

export const validatePassword = (password: string) :ResponseAfterValidate => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    
    if (password.length < minLength) {
        return {
            isValid: false,
            message: "Пароль должен содержать минимум 8 символов"
        }
    }
    
    if (!hasUpperCase) {
        return {    
            isValid: false,
            message: "Пароль должен содержать хотя бы одну заглавную букву"
        }
    }
    
    if (!hasDigit) {
        return {    
            isValid: false,
            message: "Пароль должен содержать хотя бы одну цифру"
        }
    }
    return {
        isValid: true
    }
}