import axios from "axios";
import { useCallback, useState } from "react";

// const baseURL = import.meta.env.VITE_BASE_URL
const baseURL = 'http://localhost:1212'

export function HttpRequest() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const request = useCallback(async function (path, method = 'get', body = null) {
        try {
            setLoading(true)
            const res = await fetch(baseURL + path, {
                method,
                body: body ? JSON.stringify(body) : body,   
                // headers: {
                //      Authorization: 'application/json'
                // }
            })

            if (res?.ok) {
                setLoading(false)
                const data = await res.json()
                return data
            }
            setError(true)
            return res
            
        } catch (e) {
            setLoading(false)
            setError(true)
            return e.massage
        }
    }, [])

    return {
        loading,
        error,
        request
    }
}