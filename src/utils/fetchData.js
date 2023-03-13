const sheetIDs = {
    'MainInput': '1jiL1gtJ-_Drlksr24kWaiRABOEniO0pg4Vlm05SFqYM',
    '2023PlayerData': '17ECL-ub9zRH1Sl0uKZ9Nrn6Z45xGRwoJgulQ41DDK78',
    '2023TeamData': '1GzPxpnF7GYtqQjIWDaFYHorQmmIrLYCsUBx0FCeDaSE',
    '2022PlayerData': '1dYRA1bT2phaPGH-LzgyiykkjsXoTHzkRe6aKdQe1vq0',
    '2022TeamData': '1qtdxTU_LhU9AF6lUxo5QhXlREbrj00_-4NurVD458f8',
    '2021PlayerData': '1AXH8tG8l1iSZaIo6bmpsFPlhTgtScfytRT7cfqBFAu4',
    '2021TeamData': '16QH55O9RIgx3HVi9mhp18wywt3e-dYvIvNaLixrgP0A',
    '2020PlayerData': '1Wiq54Hz7QbpkzEXhX-5sSgp11GsqmQj_GNdEtdz2RLg',
    '2020TeamData': '1bN_oDgH5fl01saFIFrUXWXtzpRrUuW9HxdivhH_HiQg',
    '2019PlayerData': '',
    '2019TeamData': '',
    '2018PlayerData': '',
    '2018TeamData': '',
    '2017PlayerData': '',
    '2017TeamData': '',
    '2016PlayerData': '',
    '2016TeamData': '',
    '2015PlayerData': '',
    '2015TeamData': ''
}
export async function queryFunc({ queryKey }) {
    const [sheetsKey, pageID] = queryKey
    console.log('fetching: '+sheetsKey+'/'+pageID)
    const data = await fetch('https://opensheet.elk.sh/' + sheetIDs[sheetsKey] + '/' + pageID)
    return data.json()
}

export function formatDate(date) {
    date = new Date(date)
    return date.toISOString().slice(0,10)
  }
