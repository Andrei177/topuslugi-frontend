"use client"

import { useAuthStore } from "@/shared/stores/auth-store";
import Input from "@/shared/ui/input/input"
import s from "./ui/page.module.css"
import Button from "@/shared/ui/button/button";
import { FormEvent } from "react";

const RecoveryPasswordPage = () => {
    const { email, setEmail } = useAuthStore();

    const handleRecoveryPass = (e: FormEvent) => {
        e.preventDefault();
        console.log("ответ при запросе на отправку ссылки на почту для восстановления пароля");
        //тут запрос recovery
    }
    return (
        <div className={s.wrapper}>
            <form className={s.form} onSubmit={handleRecoveryPass}>
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
                <Button>Отправить</Button>
            </form>
        </div>
    )
}

export default RecoveryPasswordPage
