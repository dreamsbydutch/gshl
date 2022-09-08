import { useQuery } from 'react-query';

export function useEndpointQuery(queryName, bookName, sheetName) {
    return useQuery(queryName, () => getEndpointData(bookName, sheetName));
}

async function getEndpointData(bookName, sheetName) {
    const res = await fetch(getURL(bookName, sheetName))
    return res.json();
}

const getURL = (bookName, sheetName) => {
    return 'https://opensheet.elk.sh/' + endpointIDs[bookName] + '/' + sheetName
}
const endpointIDs = {
    'MainInput': '1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM',
    '2022PlayerInfo': '1dYRA1bT2phaPGH-LzgyiykkjsXoTHzkRe6aKdQe1vq0',
    '2022PlayerSeason': '1GmvqIithq3PYbRqggXlsw-4nJa8kKsxWfD4NGmZUrh4',
    '2022PlayerWeek': '1gyl5QkH2ZGKB4bUQ7WHC0Hcs36a7f2I0NHzg2G8xDdQ',
    '2022PlayerDay': '1yKeZesCMO4RxvRMiXu6HA0z_lREFNy5zPxEv22nyh00',
    '2022TeamInfo': '1qtdxTU_LhU9AF6lUxo5QhXlREbrj00_-4NurVD458f8',
    '2022TeamSeason': '1tEgaRhJRCUuVwcJiEylAPLpB0kgNDgMnvhPokUftgfs',
    '2022TeamWeek': '1u1JcrUuSAszlKock2NLJ8a7fLfnvs0NcSPIv9sTI9V0',
    '2022TeamDay': '16Y-RJUNj1f1SfMT4CzKyQrN4Bd0gfMvYkToxQzlsByA',
    '2021PlayerInfo': '1CmmZtjZifp2NUCslFpCcH9XeVBBxLwPxb8tA_heEkjc',
    '2021PlayerSeason': '1Jusx8UKgXqA8rJ5q_pbt_rf7b3727awbfnpt1Mid13c',
    '2021PlayerWeek': '1DSaFKjelWICZ-ESuAT3L_RmAfUvpZhe4I8CeQTAcu2g',
    '2021PlayerDay': '1a-71X6eaupAFVmiDly8PWzz42DZXszp9GEK8RgXxWL8',
    '2021TeamInfo': '1YmTr_sYF-Yi-p8kb4CNx8i39s7_iTX7Y54xMgcDnw7w',
    '2021TeamSeason': '1MRHBYLvDJE4zisT1MzPn6n78xXDNH_iAf4fg5tsFte4',
    '2021TeamWeek': '1vr5bbbKFHwcbBLmQlef4A4LSIl_5MCNzO6E_O198D8c',
    '2021TeamDay': '15jdmocgoVbCFC-gYJFAmrKMCY3dYUMPRoma9iyLF_og',
    '2020PlayerInfo': '1Aq4dcmwCIu9OqXH9JrE2KGVwsDUZtA3W-vdJl_2MZmE',
    '2020PlayerSeason': '1-iT8GHikwEANBKVUa_ZzYTOCEWPHqGpuGf9364GVt8A',
    '2020PlayerWeek': '1VjZfEoaeW2vkNW_o6D4qPkE9ZO7y38qSAFgQocpQasY',
    '2020PlayerDay': '1II89ZpKEZOsrruTiRsvC2NvhUoRN8hoEhPEB3VPFMEQ',
    '2020TeamInfo': '1w9nfFkKD6PpOxkpgNt3wb1bdBzmwfH6zSuoT3b0ed74',
    '2020TeamSeason': '1LP-KsyXZLScHE7saOuo2CpjAjVtJLFBsQNVxgA7B6dM',
    '2020TeamWeek': '18LNAjUjX7RZBhwA0EJkj2hnUHACQbh0_8cqCFRwlnjc',
    '2020TeamDay': '1yLgWMesQ1rmDNMNo9y0y8XpBLmI6RjzNbEUxGgcZJYQ',
    '2019PlayerInfo': '',
    '2019PlayerSeason': '',
    '2019PlayerWeek': '',
    '2019PlayerDay': '',
    '2019TeamInfo': '',
    '2019TeamSeason': '',
    '2019TeamWeek': '',
    '2019TeamDay': '',
    '2018PlayerInfo': '',
    '2018PlayerSeason': '',
    '2018PlayerWeek': '',
    '2018PlayerDay': '',
    '2018TeamInfo': '',
    '2018TeamSeason': '',
    '2018TeamWeek': '',
    '2018TeamDay': '',
    '2017PlayerInfo': '',
    '2017PlayerSeason': '',
    '2017PlayerWeek': '',
    '2017PlayerDay': '',
    '2017TeamInfo': '',
    '2017TeamSeason': '',
    '2017TeamWeek': '',
    '2017TeamDay': '',
    '2016PlayerInfo': '',
    '2016PlayerSeason': '',
    '2016PlayerWeek': '',
    '2016PlayerDay': '',
    '2016TeamInfo': '',
    '2016TeamSeason': '',
    '2016TeamWeek': '',
    '2016TeamDay': '',
    '2015PlayerInfo': '',
    '2015PlayerSeason': '',
    '2015PlayerWeek': '',
    '2015PlayerDay': '',
    '2015TeamInfo': '',
    '2015TeamSeason': '',
    '2015TeamWeek': '',
    '2015TeamDay': ''
}
