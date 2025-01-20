import { create } from "zustand";

type TypeFormStore = {
    firstName: string
    email: string
    password: string
    isLoginVerification: boolean | undefined
    
    setFirstName: (newName: string) => void
    setEmail: (newEmail: string) => void
    setPassword: (newPass: string) => void
    setIsLoginVerification: (bool: boolean) => void
}

export const useFormStore = create<TypeFormStore>(set => ({
    firstName: "",
    email: "",
    password: "",
    isLoginVerification: undefined,

    setFirstName: (newName) => set({firstName: newName}),
    setEmail: (newEmail) => set({email: newEmail}),
    setPassword: (newPass) => set({password: newPass}),
    setIsLoginVerification: (bool) => set({isLoginVerification: bool})
}))