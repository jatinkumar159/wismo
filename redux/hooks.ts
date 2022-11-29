import { useEffect } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "./store"

export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const useMessaging = () => {
    useEffect(() => {
        if(window && window.hasOwnProperty('postMessage')) {
            console.log("PostMessage Subscibed");
            window.addEventListener("message", (ev) => console.log("received onMessage!"));
            window.onmessage = (ev) => console.log("PostMessage from onMessage");
        }
    })

    useEffect(() => {
        const onMessage = (event: MessageEvent) => {
            console.log("received event", event);
        };

        window.addEventListener('message', onMessage);
    }, []);
}