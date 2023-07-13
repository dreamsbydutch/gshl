import React from "react";
import MatchupScroller from "../components/MatchupScroller";
import PowerRankings from "../components/PowerRankings";
import MissedStarts from "../components/MissedStarts";
import ThreeStars from "../components/ThreeStars";
import { LosersBracket, PlayoffBracket } from "../components/Playoffs";
import { seasons } from "../utils/constants";
import { CapOverview } from "./LockerRoom";

export default function Home() {
  return new Date() <= new Date(seasons[0].PlayoffStartDate) ? (
    <>
      <MatchupScroller />
      <MissedStarts />
      <PowerRankings />
      <ThreeStars />
    </>
  ) : (
    <CapOverview />
  );
  // <div className="flex flex-col mb-12">
  //   <div className="text-2xl text-center py-2 font-bold">GSHL Cup Playoffs</div>
  //   <PlayoffBracket {...{ 'seasonID': seasons[0].Season }} />
  //   <div className="text-2xl text-center pt-12 pb-2 font-bold">Loser's Tournament</div>
  //   <LosersBracket {...{ 'seasonID': seasons[0].Season }} />
  // </div>
}
