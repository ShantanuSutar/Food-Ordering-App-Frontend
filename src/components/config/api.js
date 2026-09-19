import axios from "axios"

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9090"
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type" : "application/json"
    }
})
