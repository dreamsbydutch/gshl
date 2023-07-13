import { seasons } from "./constants";
import { PlayerContractType } from "./endpointTypes";

export function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function moneyFormatter(number: number) {
  const formatter = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "USD",
    minimumSignificantDigits: 1,
  });
  return formatter.format(number).replace("US", "");
}

export function getCurrentSeason() {
  return seasons
    .filter((season) => season.SeasonStartDate < new Date())
    .slice(-1)[0];
}
export function getUpcomingSeasons() {
  return seasons.filter((season) => season.LateSigningEndDate > new Date());
}
export function getTeamCapSpace(contracts: PlayerContractType[]) {
  const upcomingSeasons = getUpcomingSeasons();
  return [
    22500000 -
      contracts
        .filter(
          (contract) => contract.CapHitExpiry > upcomingSeasons[0].SeasonEndDate
        )
        .map((a) => +a.CapHit)
        .reduce((a, b) => a + b, 0),
    25000000 -
      contracts
        .filter(
          (contract) => contract.CapHitExpiry > upcomingSeasons[1].SeasonEndDate
        )
        .map((obj) => +obj.CapHit)
        .reduce((a, b) => a + b, 0),
    25000000 -
      contracts
        .filter(
          (contract) => contract.CapHitExpiry > upcomingSeasons[2].SeasonEndDate
        )
        .map((obj) => +obj.CapHit)
        .reduce((a, b) => a + b, 0),
    25000000 -
      contracts
        .filter(
          (contract) => contract.CapHitExpiry > upcomingSeasons[3].SeasonEndDate
        )
        .map((obj) => +obj.CapHit)
        .reduce((a, b) => a + b, 0),
  ];
}
