"use client"

import { useAuthStore } from "@/shared/stores/auth-store"
import Input from "@/shared/ui/input/input"
import s from "./ui/page.module.css"
import Button from "@/shared/ui/button/button"
import { FormEvent, useState } from "react"
import { resetPassword } from "@/api/auth-api/auth"
import { AxiosError } from "axios"
import cx from "classnames"
import Loader from "@/shared/ui/loader/loader"

const RecoveryPasswordPage = () => {
    const { email, setEmail } = useAuthStore()
    const [message, setMessage] = useState<string>("")
    const [success, setSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleRecoveryPass = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        resetPassword(email)
        .then(res => {
            console.log(res, "ответ при запросе на отправку ссылки на почту для восстановления пароля");
            setSuccess(true)
            setMessage("Перейдите по ссылке в письме для обновления пароля")
        })
        .catch(err => {
            if(err instanceof AxiosError && err.response?.data.detail){
                setMessage(String(err.response?.data.detail))
            }
            else{
                setMessage("Произошла непредвиденная ошибка, попробуйте ещё раз")
            }
            console.log(err, "ошибка при попытке отправки ссылки для восстановления пароля")
            setSuccess(false)
        })
        .finally(() => setIsLoading(false))
    }
    return (
        <div className={s.wrapper}>
            <form className={s.form} onSubmit={handleRecoveryPass}>
                {isLoading && <Loader className={s.loader} />}
                <h1>Восстановление пароля</h1>
                <p>
                    Мы вышлем код сброса на вашу электронную почту.
                </p>
                <label htmlFor="email">Email</label>
                <Input
                    type="email"
                    placeholder='Введите свой email'
                    id="verifyCode"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <p className={
                    message.length > 0 
                        ? success
                            ? cx(s.msg, s.visible, s.green)
                            : cx(s.msg, s.visible)
                        : cx(s.msg, s.hidden)
                    }>{message}</p>
                <Button>Продолжить</Button>
            </form>
        </div>
    )
}

export default RecoveryPasswordPage
