import { create } from "zustand"
import get from "axios" // Importing get method from axios for fetching data

type AhrefsData = {
        keyword: string
        kd: number
        des: string
}

type AhrefsState = {
        ahrefData: AhrefsData[]
        ahrefError: string | null
        fetchAhrefs: (keywords: string) => Promise<void> // Return type is Promise<void>
}

// Ensure the URL is correctly set based on the environment
const URL = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
        : "http://localhost:3000/api"

export const useAhrefsStore = create<AhrefsState>((set) => ({
        ahrefData: [],
        ahrefError: null,
        async fetchAhrefs(keywords: string) {
                try {
                        // Base64 decode the keywords
                        const decodedKeywords = atob(keywords) // atob is used to decode a base64 encoded string
                        // const keywordList = decodedKeywords.split(',')

                        // Use axios.get with proper headers for GET request
                        const response = await get(`${URL}/ahref/kd/?keywords=${encodeURIComponent(decodedKeywords)}`, {
                                headers: {
                                        'Content-Type': 'application/json',
                                },
                        })

                        if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`)
                        }

                        const data: AhrefsData[] = response.data
                        set((state) => ({ ahrefData: data }))
                } catch (error) {
                        set({ ahrefError: error.message }) // Update the error state with the error message
                        console.error("Error fetching AhrefsData:", error.message)
                }
        },
}))