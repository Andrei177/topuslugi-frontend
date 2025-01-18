"use client"

import { FormEvent, useEffect, useState } from "react"
import { useAuthStore } from "@/shared/stores/auth-store"
import { verifyEmail } from "@/api/auth-api/auth"
import { useRouter } from "next/navigation"
import Input from "@/shared/ui/input/input"
import Button from "@/shared/ui/button/button"
import s from "./login-form.module.css"
import Link from "next/link"
import Loader from "@/shared/ui/loader/loader"
import { AxiosError } from "axios"
import cx from "classnames"
import { validatePassword } from "@/shared/utils/validatePassword"

const LoginForm = () => {

    const router = useRouter();

    const { email, password, setEmail, setPassword, setIsLoginVerification } = useAuthStore();

    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (password.length > 0) {
            const result = validatePassword(password)
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
    }, [password])

    const handleVerifyEmail = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        verifyEmail({ email, password })
            .then(res => {
                console.log(res, "ответ при отправке кода на почту")
                setIsLoginVerification(true)
                router.push("/verify")
            })
            .catch(err => {
                if (err instanceof AxiosError) {
                    setMessage(err.response?.data.detail)
                }
                else {
                    setMessage("Произошла непредвиденная ошибка, попробуйте обновить странцу")
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
                className="email"
                type="email"
                placeholder="Введите свой e-mail"
                name="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="password">Пароль</label>
            <Input
                className="password"
                type="password"
                placeholder="Введите пароль"
                name="password"
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <p className={message.length > 0 ? cx(s.msg, s.visible) : cx(s.msg, s.hidden)}>{message}</p>
            <Button
                disabled={!/[A-Z]/.test(password) || !/\d/.test(password) || password.length < 8 || email.length === 0}
                className={s.btn}
            >
                Войти
            </Button>
            <Link href={"/recovery"} className={s.forgot_pass}>Забыли пароль?</Link>
        </form>
    )
}

export default LoginForm
