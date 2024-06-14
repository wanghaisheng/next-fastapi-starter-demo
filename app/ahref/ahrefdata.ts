import { create } from "zustand"
import axios, { AxiosResponse } from 'axios'

type AhrefsData = {
        keyword: string
        kd: number
        des: string
}

type AhrefsState = {
        ahrefData: AhrefsData[]
        ahrefError: string | null
        fetchAhrefs: (keywords: string) => void // Corrected return type to void
}

const URL = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
        : "http://localhost:3000/api"

export const useAhrefsStore = create<AhrefsState>((set) => ({
        ahrefData: [],
        ahrefError: null,
        async fetchAhrefs(keywords: string) {
                try {
                        const decodedKeywords = atob(keywords)
                        // Use axios.get with proper headers for GET request
                        const response: AxiosResponse<AhrefsData[]> = await axios.get(`${URL}/ahref/kd/?keywords=${encodeURIComponent(decodedKeywords)}`, {
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                        })

                        // Check for successful response (status code 200)
                        if (response.status >= 200 && response.status < 300) {
                                const data: AhrefsData[] = response.data
                                set((state) => ({ ahrefData: data }))
                        } else {
                                // If the status code is not successful, throw an error
                                throw new Error(`HTTP error! status: ${response.status}`)
                        }
                } catch (error) {
                        set({ ahrefError: error.message }) // Update the error state with the error message
                        console.error("Error fetching AhrefsData:", error.message)
                }
        },
}))