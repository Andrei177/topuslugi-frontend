"use client"

import { auth } from '@/api/auth-api/auth';
import { useFormStore } from '@/shared/stores/form-store'
import Button from '@/shared/ui/button/button';
import Input from '@/shared/ui/input/input';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react'
import s from "./ui/page.module.css"
import Loader from '@/shared/ui/loader/loader';
import cx from "classnames"
import { AxiosError } from 'axios';
import { Routes } from '@/shared/routing/routes';

const Verify = () => {
  const router = useRouter();

  const { phoneNumber } = useFormStore();
  const [smsCode, setSmsCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    auth({ phoneNumber, smsCode })
      .then(res => {
        console.log(res, "ответ при входе")
        router.push(Routes.ROOT)
        if(res.headers.authorization){
          localStorage.setItem("token", res.headers.authorization)
        }
      })
      .catch(err => {
        if (err instanceof AxiosError && err.response?.data.detail) {
          setMessage(String(err.response?.data.detail))
        }
        else {
          setMessage("Произошла непредвиденная ошибка, попробуйте вернуться на страницу входа")
        }
        console.log(err, "ошибка при входе")
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className={s.wrapper}>
      <form className={s.form} onSubmit={handleAuth}>
        {isLoading && <Loader className={s.loader} />}
        <h1>Верификация</h1>
        <p>
          Пожалуйста, введите 6-значный проверочный код,
          который был отправлен на ваш номер телефона, но пока на адрес электронной почты.
          Код действителен в течение 30 минут.
        </p>
        <label htmlFor="verifyCode">Проверочный код</label>
        <Input
          type="number"
          placeholder='XXXXXX'
          id="verifyCode"
          value={smsCode}
          onChange={e => setSmsCode(e.target.value)}
        />
        <p className={
          message.length > 0
            ? cx(s.msg, s.visible)
            : cx(s.msg, s.hidden)
        }>{message}</p>
        <Button>
          Проверить
        </Button>
      </form>
    </div>
  )
}

export default Verify
