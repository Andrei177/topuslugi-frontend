"use client"

import { FormEvent, useEffect, useState } from "react"
import { useFormStore } from "@/shared/stores/form-store"
import { verifyEmail } from "@/api/auth-api/auth"
import { useRouter } from "next/navigation"
import Input from "@/shared/ui/input/input"
import Button from "@/shared/ui/button/button"
import s from "./login-form.module.css"
import Link from "next/link"
import Loader from "@/shared/ui/loader/loader"
import { AxiosError } from "axios"
import cx from "classnames"
import { validateLoginForm } from "@/shared/utils/validateForm"
import Password from "@/shared/ui/password/password"

const LoginForm = () => {

    const router = useRouter();

    const { email, password, setEmail, setPassword, setIsLoginVerification } = useFormStore();
    const [isValidForm, setIsValidForm] = useState<boolean>(false);

    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (password.length > 0 || email.length > 0) {
            const result = validateLoginForm(password, email)
            setIsValidForm(result.isValid)
            if (!result.isValid && result.message) {
                setMessage(result.message)
            }
            else {
                setMessage("")
            }
        }
        else {
            setMessage("")
        }
    }, [password, email])

    const handleVerifyEmail = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        verifyEmail({ email, password, isNewAcc: false})
            .then(res => {
                console.log(res, "ответ при отправке кода на почту")
                setIsLoginVerification(true)
                router.push("/verify")
            })
            .catch(err => {
                if (err instanceof AxiosError && err.response?.data.detail) {
                    setMessage(err.response?.data.detail)
                }
                else {
                    setMessage("Произошла непредвиденная ошибка, попробуйте обновить страницу")
                }
                console.log(err, "ошибка при отправке кода на почту")
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <form className={s.form} onSubmit={handleVerifyEmail}>
            {isLoading && <Loader className={s.loader} />}
            <label htmlFor="email">Email</label>
            <Input
                type="email"
                placeholder="Введите свой e-mail"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Пароль</label>
            <Password
                placeholder="Введите пароль"
                name="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <p className={message.length > 0 ? cx(s.msg, s.visible) : cx(s.msg, s.hidden)}>{message}</p>
            <Button
                disabled={!isValidForm}
                className={s.btn}
            >
                Войти
            </Button>
            <Link href={"/reset-password"} className={s.forgot_pass}>Забыли пароль?</Link>
        </form>
    )
}

export default LoginForm
