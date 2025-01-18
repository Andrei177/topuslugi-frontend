"use client"

import { FormEvent } from "react"
import { useAuthStore } from "@/shared/stores/auth-store";
import { verifyEmail } from "@/api/auth-api/auth";
import { useRouter } from "next/navigation";
import Input from "@/shared/ui/input/input";
import Button from "@/shared/ui/button/button";
import s from "./signup-form.module.css"

const SignupForm = () => {

    const router = useRouter();

    const { email, password, firstName ,setEmail, setPassword, setFirstName, setIsLoginVerification } = useAuthStore();

    const handleVerifyEmail = (e: FormEvent) => {
        e.preventDefault();
        verifyEmail({ email, password })
            .then(res => {
                console.log(res, "ответ при отправке кода на почту")
                setIsLoginVerification(false)
                router.push("/verify")
            })
            .catch(err => {
                console.log(err, "ошибка при отправке кода на почту")
            })
    }

    return (
        <form className={s.form} onSubmit={handleVerifyEmail}>
            <label htmlFor="firstName">Имя</label>
            <Input
                type="text"
                placeholder="Введите своё имя"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
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
                name="password"
                id="retry-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <Button className={s.btn}>Зарегистрироваться</Button>
        </form>
    )
}

export default SignupForm
