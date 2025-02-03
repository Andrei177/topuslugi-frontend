import Link from "next/link"
import { ReactNode } from "react"
import s from "./form-layout.module.css"

const FormLayout = ({ children, title }: { children: ReactNode, title: string}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.auth}>
                <h1>{title}</h1>
                {children}
            </div>
        </div>
    )
}

export default FormLayout
