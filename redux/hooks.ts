import { useEffect } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const initialiseMessaging = () => {
    const handler = (message: MessageEvent) => {
        if(message.type.indexOf('TURBO') == -1) return;
        console.log(message.data.cartPayload);
    }
    useEffect(() => {
        window.addEventListener("message", handler);
        return () => window.removeEventListener('message', handler);
    })
}