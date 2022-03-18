import useFetch from "./useFetch"


export function useFetchStandings() {
    const url = 'https://opensheet.elk.sh/1qtdxTU_LhU9AF6lUxo5QhXlREbrj00_-4NurVD458f8/1'
    const standingsData = useFetch(url)
    return standingsData
}