import { useEffect } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const initialiseMessaging = () => {
    const handler = (message: MessageEvent) => {
        console.log(message.data);
    }
    useEffect(() => {
        window.addEventListener("message", handler);
        return () => window.removeEventListener('message', handler);
    })
}