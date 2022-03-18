import { useEffect, useState } from 'react'
import useFetch from './useFetch'


export function useFetchTeams(season) {
    const ownerURL = 'https://opensheet.elk.sh/1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM/1'
    const teamURL = 'https://opensheet.elk.sh/1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM/2'
    const teamFetchData = useFetch(teamURL)
    const ownerFetchData = useFetch(ownerURL)

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (
            async function () {
                try {
                    setLoading(true)
                    if (teamFetchData.data && ownerFetchData.data) {
                        setData(teamFetchData.data.map(team => {
                            return {
                                'id': team[season],
                                'TeamName': team.TeamName,
                                'Owner': ownerFetchData.data.filter(obj => obj.id === team.OwnerID).map(owner => [owner.FirstName + ' ' + owner.LastName,owner.Nickname])[0],
                                'LogoURL': team.LogoURL,
                                'Conference': team.Conference
                            }
                        }).filter(obj => obj.id))
                        setLoading(false)
                    }
                } catch (err) {
                    setError(err)
                }
            }
        )()
    }, [teamFetchData.data, ownerFetchData.data, season])
    return { data, error, loading }
}