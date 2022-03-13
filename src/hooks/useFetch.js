import { useEffect, useState } from "react"
import axios from "redaxios"


export function useStandingsFetch() {
    const url = 'https://opensheet.elk.sh/1qtdxTU_LhU9AF6lUxo5QhXlREbrj00_-4NurVD458f8/1'
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {(
            async function () {
                try {
                    setLoading(true)
                    const response = await axios.get(url)
                    setData(response.data)
                } catch (err) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [])

    return { data, error, loading }

}

export function useScheduleFetch() {
    const url = 'https://opensheet.elk.sh/12vxesMbhg1fDOy75Vs_AYrGGra_zBQhhyhXC8UJtNJQ/1'
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {(
            async function () {
                try {
                    setLoading(true)
                    const response = await axios.get(url)
                    setData(response.data)
                } catch (err) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
            }
        )()
    }, [])

    return { data, error, loading }

}