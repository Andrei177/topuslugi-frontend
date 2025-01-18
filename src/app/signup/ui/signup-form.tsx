"use client"

import { FormEvent, useEffect, useState } from "react"
import { useAuthStore } from "@/shared/stores/auth-store";
import { verifyEmail } from "@/api/auth-api/auth";
import { useRouter } from "next/navigation";
import Input from "@/shared/ui/input/input";
import Button from "@/shared/ui/button/button";
import s from "./signup-form.module.css"
import Link from "next/link";
import { validatePassword } from "../../../shared/utils/validatePassword";
import cx from "classnames"
import { AxiosError } from "axios";
import Loader from "@/shared/ui/loader/loader";

const SignupForm = () => {

    const router = useRouter();

    const { email, password, firstName, setEmail, setPassword, setFirstName, setIsLoginVerification } = useAuthStore();
    const [isApproved, setIsApproved] = useState<boolean>(false);

    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (password.length > 0) {
            const result = validatePassword(password)
            if (!result.isValid && result.message) {
                setMessage(result.message)
            }
            else if (!isApproved) {
                setMessage("Для регистрации необходимо дать согласие")
            }
            else {
                setMessage("")
            }
        }
        else {
            setMessage("")
        }
    }, [password, isApproved])

    const handleVerifyEmail = (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        verifyEmail({ email, password })
            .then(res => {
                console.log(res, "ответ при отправке кода на почту")
                setIsLoginVerification(false)
                router.push("/verify")
            })
            .catch(err => {
                if(err instanceof AxiosError){
                    setMessage(err.response?.data.detail)
                }
                else{
                    setMessage("Произошла непредвиденная ошибка, попробуйте обновить странцу")
                }
                console.log(err, "ошибка при отправке кода на почту")
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <form className={s.form} onSubmit={handleVerifyEmail}>
            {isLoading && <Loader className={s.loader}/>}
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
                name="retry-password"
                id="retry-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div className={s.approval}>
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={isApproved}
                    onChange={e => setIsApproved(e.target.checked)}
                />
                <div className={s.approval_text}>
                    Создавая учетную запись,
                    вы соглашаетесь с нашей <Link href={"/policy"} className={s.rules}>Политикой конфиденциальности</Link>
                    и <Link href={"/rules"} className={s.rules}>Правилами пользования.</Link>
                </div>
            </div>
            <p className={message.length > 0 ? cx(s.msg, s.visible) : cx(s.msg, s.hidden)}>{message}</p>
            <Button 
                disabled={!isApproved || !/[A-Z]/.test(password) || !/\d/.test(password) || password.length < 8 || firstName.length === 0 || email.length === 0} 
                className={s.btn}
            >
                Зарегистрироваться
            </Button>
        </form>
    )
}

export default SignupForm
