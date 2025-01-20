import Link from "next/link"
import { ReactNode } from "react"
import s from "./form-layout.module.css"

const FormLayout = ({ children, title, loginPage }: { children: ReactNode, title: string, loginPage?: boolean }) => {
    return (
        <div className={s.wrapper}>
            <div className={s.auth}>
                <h1>{title}</h1>
                <p>
                    {
                        loginPage
                            ? <span>Новый пользователь?<Link href={"/signup"}>Создать аккаунт</Link></span>
                            : <span>Уже есть аккаунт?<Link href={"/login"}>Войти</Link></span>
                    }
                </p>
                {children}
            </div>
        </div>
    )
}

export default FormLayout
