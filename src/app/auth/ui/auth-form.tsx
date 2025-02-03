"use client"

import { FormEvent, useState } from "react"
import { useFormStore } from "@/shared/stores/form-store"
import { verifyPhone } from "@/api/auth-api/auth"
import { useRouter } from "next/navigation"
import Input from "@/shared/ui/input/input"
import Button from "@/shared/ui/button/button"
import s from "./login-form.module.css"
import Loader from "@/shared/ui/loader/loader"
import { AxiosError } from "axios"
import cx from "classnames"

const AuthForm = () => {

    const router = useRouter();

    const { phoneNumber, setPhoneNumber } = useFormStore();

    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // эффект был для смены состояния сообщения для уведомления о некорректном вводе
    //useEffect(() => {
        // if (password.length > 0 || phoneNumber.length > 0) {
        //     const result = validateLoginForm(password, email)
        //     setIsValidForm(result.isValid)
        //     if (!result.isValid && result.message) {
        //         setMessage(result.message)
        //     }
        //     else {
        //         setMessage("")
        //     }
        // }
        // else {
        //     setMessage("")
        // }
    //}, [password, email])

    const handleVerifyEmail = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        verifyPhone({ phoneNumber })
            .then(res => {
                console.log(res, "ответ при отправке смс на телефон (пока кода на почту)")
                router.push(Routes.VERIFY)
            })
            .catch(err => {
                if (err instanceof AxiosError && err.response?.data.detail) {
                    setMessage(err.response?.data.detail)
                }
                else {
                    setMessage("Произошла непредвиденная ошибка, попробуйте обновить страницу")
                }
                console.log(err, "ошибка при отправке смс на телефон (кода на почту)")
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <form className={s.form} onSubmit={handleVerifyEmail}>
            {isLoading && <Loader className={s.loader} />}
            <label htmlFor="phone">Номер телефона</label>
            <Input
                type="text"
                placeholder="Введите номер телефона (пока e-mail)"
                name="phone"
                id="phone"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
            />
            <p className={message.length > 0 ? cx(s.msg, s.visible) : cx(s.msg, s.hidden)}>{message}</p>
            <Button
                className={s.btn}
            >
                Войти
            </Button>
        </form>
    )
}

export default AuthForm
