"use client"

import Input from "@/shared/ui/input/input"
import s from "./page.module.css"
import Button from "@/shared/ui/button/button"
import { useAuthStore } from "@/shared/stores/auth-store"
import { FormEvent, useState } from "react"
import Loader from "@/shared/ui/loader/loader"
import cx from "classnames"
import { updatePassword } from "@/api/auth-api/auth"
import { useParams } from "next/navigation"
import { AxiosError } from "axios"

const SetNewPasswordPage = () => {

    const { email, setEmail, password, setPassword } = useAuthStore();
    const [retryPassword, setRetryPassword] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const params = useParams();

    const handleSetNewPass = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(params.key)
        updatePassword(email, password, retryPassword, String(params.key))
        .then(res => {
            console.log(res, "ответ при обновлении пароля")
            setSuccess(true)
            setMessage(String(res.data.message))
        })
        .catch(err => {
            if(err instanceof AxiosError){
                console.log(err.response?.data.detail)
            }
            console.log(err, "ошибка при обновлении пароля")
            setMessage("Произошла ошибка, попробуйте обновить страницу")
            setSuccess(false)
        })
        .finally(() => setIsLoading(false))
    }

    return (
        <div className={s.wrapper}>
            <form className={s.form} onSubmit={handleSetNewPass}>
                {isLoading && <Loader className={s.loader} />}
                <h1>Придумайте новый пароль</h1>
                <label htmlFor="email">Email</label>
                <Input
                    type="email"
                    placeholder='Введите свой email'
                    id="verifyCode"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Введите пароль"
                    name="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="retry-password">Повторите пароль</label>
                <Input
                    type="password"
                    placeholder="Повторите пароль"
                    name="retry-password"
                    id="retry-password"
                    value={retryPassword}
                    onChange={e => setRetryPassword(e.target.value)}
                />
                <p className={
                    message.length > 0 
                        ? success
                            ? cx(s.msg, s.visible, s.green)
                            : cx(s.msg, s.visible)
                        : cx(s.msg, s.hidden)
                    }>{message}</p>
                <Button>Обновить пароль</Button>
            </form>
        </div>
    )
}

export default SetNewPasswordPage
