import { create } from "zustand";

type TypeFormStore = {
    firstName: string
    phoneNumber: string
    
    setFirstName: (newName: string) => void
    setPhoneNumber: (newPhone: string) => void
}

export const useFormStore = create<TypeFormStore>(set => ({
    firstName: "",
    phoneNumber: "",

    setFirstName: (newName) => set({firstName: newName}),
    setPhoneNumber: (newPhone) => set({phoneNumber: newPhone}),
}))