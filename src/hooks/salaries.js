import { useEffect, useState } from 'react'
import useFetch from './useFetch'


export function useFetchAllSalaries() {
    const allSalariesURL = 'https://opensheet.elk.sh/159KBWmaW7ystY-O7FIlOrZPvyjJP6rro63BkgkCfp-Q/1'
    const allSalariesFetchData = useFetch(allSalariesURL)

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true)
                    if (allSalariesFetchData.data) {
                        setData(allSalariesFetchData.data)
                        setLoading(false)
                    }
                } catch (err) {
                    setError(err)
                }
            }
        )()
    }, [allSalariesFetchData.data])
    return { data, error, loading }
}

export function useFetchTeamSalaries(teamID) {
    const teamSalariesURL = 'https://opensheet.elk.sh/159KBWmaW7ystY-O7FIlOrZPvyjJP6rro63BkgkCfp-Q/2'
    const teamSalariesFetchData = useFetch(teamSalariesURL)

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true)
                    if (teamSalariesFetchData.data) {
                        setData(teamSalariesFetchData.data.filter(obj => obj.gshlTeam === teamID))
                        setLoading(false)
                    }
                } catch (err) {
                    setError(err)
                }
            }
        )()
    }, [teamSalariesFetchData.data, teamID])
    return { data, error, loading }
}

export function useFetchTeamContracts(teamID) {
    const teamContractsURL = 'https://opensheet.elk.sh/1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM/7'
    const teamContractsFetchData = useFetch(teamContractsURL)

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true)
                    if (teamContractsFetchData.data) {
                        setData(teamContractsFetchData.data.filter(obj => obj.Team === teamID && new Date(obj.Expiry) > new Date()))
                        setLoading(false)
                    }
                } catch (err) {
                    setError(err)
                }
            }
        )()
    }, [teamContractsFetchData.data, teamID])
    return { data, error, loading }
}