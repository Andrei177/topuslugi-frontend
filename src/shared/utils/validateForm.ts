type ResponseAfterValidate = {
    isValid: boolean
    message?: string
}

export const validateForm = (password: string, firstName: string, email: string) :ResponseAfterValidate => {
    const minLength = 8;
    const hasUpperCase = /[A-ZА-ЯЁ]/.test(password);
    const hasDigit = /\d/.test(password);
    const emailIsValid = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    
    if(firstName.length == 0){
        return {
            isValid: false,
            message: "Имя не может быть пустым"
        }
    }

    if(!emailIsValid){
        return {
            isValid: false,
            message: "Проверьте правильность email"
        }
    }

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
export const validateLoginForm = (password: string, email: string) :ResponseAfterValidate => {
    const minLength = 8;
    const hasUpperCase = /[A-ZА-ЯЁ]/.test(password);
    const hasDigit = /\d/.test(password);
    const emailIsValid = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if(!emailIsValid){
        return {
            isValid: false,
            message: "Проверьте правильность email"
        }
    }

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