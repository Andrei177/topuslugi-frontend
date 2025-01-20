"use client"

import { refreshTokens } from "@/api/auth-api/auth"
import { useAuthStore } from "@/shared/stores/auth-store"
import Loader from "@/shared/ui/loader/loader"
//import { useRouter } from "next/navigation"
import { PropsWithChildren, useEffect, useState } from "react"
import s from "./auth-layout.module.css"

const AuthLayout = ({ children }: PropsWithChildren) => {

  //const router = useRouter()
  const { hasRefreshed, setHasRefreshed, setIsAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!hasRefreshed) {

      setHasRefreshed(true)
      setIsLoading(true)

      refreshTokens()
        .then(res => {
          console.log(res, "ответ при рефреше токенов")
          setIsAuth(true)
          localStorage.setItem("token", res.headers.authorization)
        })
        .catch(err => {
          console.log(err, "ошибка при рефреше токенов")
          setIsAuth(false)

        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  return (
    <>
      {
        <>
          {children}
          {isLoading && <Loader className={s.loader} />}
        </>
      }
    </>
  )
}

export default AuthLayout
