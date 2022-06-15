import { useQuery } from "react-query";
import axios from "axios";

const getTeamStats = async () => {
  const { data } = await axios.get(
    'https://opensheet.elk.sh/1Jlu4YnJiih20dbNtJEi5iywdXTURM1F2a2mdl47U3ME/1'
  );
  return data;
};

export default function useTeamStats() {
  return useQuery("posts", getTeamStats);
}