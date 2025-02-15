import { ButtonHTMLAttributes } from "react"
import cx from "classnames"
import s from "./button.module.css"

interface IPropsButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?: string
}

const Button = ({className, ...otherProps}: IPropsButton) => {
  return (
    <button className={otherProps.disabled ? cx(s.disabled_btn, className) : cx(s.btn, className)} {...otherProps}/>
  )
}

export default Button
