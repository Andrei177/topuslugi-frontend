"use client"

import { InputHTMLAttributes, useState } from "react"
import s from "./password.module.css"
import cx from "classnames"
import Image from "next/image"
import eye from "../../../../public/eye.svg"

interface IPropsPassword extends InputHTMLAttributes<HTMLInputElement>{
    className?: string
}

const Password = ({className, ...otherProps}: IPropsPassword) => {

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  return (
    <div className={s.wrapper}>
      <input className={cx(s.pass, className)} {...otherProps} type={isShowPassword ? "text" :"password"}/>
      <Image className={s.eye} src={eye} alt="eye" onClick={() => setIsShowPassword(!isShowPassword)}/>
    </div>
  )
}

export default Password
