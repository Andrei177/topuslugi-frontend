import { create } from "zustand";

type TypeAuthStore = {
    isAuth: boolean,
    setIsAuth: (bool: boolean) => void,
    hasRefreshed: boolean,
    setHasRefreshed: (bool: boolean) => void,
}

export const useAuthStore = create<TypeAuthStore>(set => ({
    isAuth: false,
    setIsAuth: (bool: boolean) => set({isAuth: bool}),
    hasRefreshed: false,
    setHasRefreshed: (bool: boolean) => set({hasRefreshed: bool}),
}))