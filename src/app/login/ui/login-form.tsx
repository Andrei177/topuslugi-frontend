"use client"

import { FormEvent } from "react"
import { useAuthStore } from "@/shared/stores/auth-store";
import { verifyEmail } from "@/api/auth-api/auth";
import { useRouter } from "next/navigation";
import Input from "@/shared/ui/input/input";
import Button from "@/shared/ui/button/button";
import s from "./login-form.module.css"
import Link from "next/link";

const LoginForm = () => {

    const router = useRouter();

    const { email, password, setEmail, setPassword, setIsLoginVerification } = useAuthStore();

    const handleVerifyEmail = (e: FormEvent) => {
        e.preventDefault();
        verifyEmail({ email, password })
            .then(res => {
                console.log(res, "ответ при отправке кода на почту")
                setIsLoginVerification(true)
                router.push("/verify")
            })
            .catch(err => {
                console.log(err, "ошибка при отправке кода на почту")
            })
    }

    return (
        <form className={s.form} onSubmit={handleVerifyEmail}>
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
            <Button className={s.btn}>Войти</Button>
            <Link href={"/recovery"} className={s.forgot_pass}>Забыли пароль?</Link>
        </form>
    )
}

export default LoginForm
