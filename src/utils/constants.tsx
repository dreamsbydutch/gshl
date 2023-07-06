import { SeasonInfoDataType } from "./endpointTypes"

export const seasons: Array<SeasonInfoDataType> = [
  {'Season': 2023,
    'CurrentNHLGamesPlayed': 82,
    'SeasonStartDate': new Date('2022-10-11T00:00:00'),
    'SeasonEndDate': new Date('2023-03-19T00:00:00'),
    'SeasonDays': 160,
    'SeasonLength': 22,
    'PlayoffStartDate': new Date('2023-03-20T00:00:00'),
    'PlayoffEndDate': new Date('2023-04-14T00:00:00'),
    'PlayoffDays': 26,
    'EarlySigningStartDate': new Date('2022-12-15T00:00:00'),
    'EarlySigningEndDate': new Date('2022-12-31T00:00:00'),
    'LateSigningStartDate': new Date('2023-04-15T00:00:00'),
    'LateSigningEndDate': new Date('2023-06-10T00:00:00'),
    'Positions': [['C', 'LW', 'RW', 'D', 'G', 'Util', 'BN', 'IR+', 'IR'], [2, 2, 2, 3, 1, 1, 4, 1, 1]],
    'Categories': ['G', 'A', 'P', 'PPP', 'SOG', 'HIT', 'BLK', 'W', 'GAA', 'SVP'],
    'PlayerData':'17ECL-ub9zRH1Sl0uKZ9Nrn6Z45xGRwoJgulQ41DDK78',
    'TeamData':'1GzPxpnF7GYtqQjIWDaFYHorQmmIrLYCsUBx0FCeDaSE',
  },
  {'Season': 2022,
    'CurrentNHLGamesPlayed': 82,
    'SeasonStartDate': new Date('2021-10-12T00:00:00'),
    'SeasonEndDate': new Date('2022-03-27T00:00:00'),
    'SeasonDays': 167,
    'SeasonLength': 22,
    'PlayoffStartDate': new Date('2022-03-28T00:00:00'),
    'PlayoffEndDate': new Date('2022-05-01T00:00:00'),
    'PlayoffDays': 35,
    'EarlySigningStartDate': new Date('2021-12-15T00:00:00'),
    'EarlySigningEndDate': new Date('2021-12-31T00:00:00'),
    'LateSigningStartDate': new Date('2022-05-02T00:00:00'),
    'LateSigningEndDate': new Date('2022-06-26T00:00:00'),
    'Positions': [['C', 'LW', 'RW', 'D', 'G', 'Util', 'BN', 'IR+', 'IR'], [2, 2, 2, 3, 1, 1, 4, 1, 1]],
    'Categories': ['G', 'A', 'P', 'PPP', 'SOG', 'HIT', 'BLK', 'W', 'GAA', 'SVP'],
    'PlayerData':'1dYRA1bT2phaPGH-LzgyiykkjsXoTHzkRe6aKdQe1vq0',
    'TeamData': '1qtdxTU_LhU9AF6lUxo5QhXlREbrj00_-4NurVD458f8',
  },
  {'Season': 2021,
    'CurrentNHLGamesPlayed': 56,
    'SeasonStartDate': new Date('2021-01-13T00:00:00'),
    'SeasonEndDate': new Date('2021-04-18T00:00:00'),
    'SeasonDays': 96,
    'SeasonLength': 13,
    'PlayoffStartDate': new Date('2021-04-19T00:00:00'),
    'PlayoffEndDate': new Date('2021-05-19T00:00:00'),
    'PlayoffDays': 31,
    'EarlySigningStartDate': new Date('2021-02-15T00:00:00'),
    'EarlySigningEndDate': new Date('2021-02-16T00:00:00'),
    'LateSigningStartDate': new Date('2021-05-19T00:00:00'),
    'LateSigningEndDate': new Date('2021-07-27T00:00:00'),
    'Positions': [['C', 'LW', 'RW', 'D', 'G', 'Util', 'BN', 'IR+', 'IR'], [2, 2, 2, 3, 1, 1, 4, 1, 1]],
    'Categories': ['G', 'A', 'P', 'PPP', 'SOG', 'HIT', 'BLK', 'W', 'GAA', 'SVP'],
    'PlayerData': '1rhHd7KJSA633Rrvq_H3d2gO29HH74TZC6RRa2d_F2eA',
    'TeamData': '1UP79cmi-XO9U2SNswiE6qJe4ngOPLJsuA2Uwp5npvJM',
  },
]
export const InjuryDesignations = ['DTD', 'O', 'IR', 'IR-LT', 'IR-NR', 'COVID-19', 'SUSP', 'NA']