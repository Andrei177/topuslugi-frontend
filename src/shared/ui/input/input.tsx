import { InputHTMLAttributes } from "react"
import cx from "classnames"
import s from "./input.module.css"

interface IPropsInput extends InputHTMLAttributes<HTMLInputElement>{
    className?: string
}

const Input = ({className, ...otherProps}: IPropsInput) => {
  return (
    <input className={cx(s.inp, className)} {...otherProps}/>
  )
}

export default Input
