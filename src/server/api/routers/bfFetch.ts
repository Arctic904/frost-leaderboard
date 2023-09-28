import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const battlefyFetch = createTRPCRouter({
  getById: publicProcedure
    .input(
      z
        .string()
        .includes("https://battlefy.com/")
        .includes("/bracket/")
        .nonempty()
        .transform((input) => {
          const id = input.split("/bracket/")[0]?.split("/").pop();
          return id;
        }),
    )
    .query(async ({ ctx, input }) => {
      const id = input;
      //https://api.battlefy.com/stages/650a2750c6f4e144633e0df4/matches
      return await fetch(`https://api.battlefy.com/stages/${id}/matches`)
        .then((res) => res.json())
        .then((data: Battlefy) => {
          return data;
        });
    }),
});

export type Battlefy = {
  _id: string;
  top: Team;
  bottom: Team;
  matchType: string;
  matchNumber: number;
  roundNumber: number;
  isBye: boolean;
  next?: Next;
  createdAt: Date;
  updatedAt: Date;
  doubleLoss: boolean;
  stageID: string;
  isComplete: boolean;
  schedule: Schedule;
  stats?: Stat[];
  completedAt?: Date;
  isMarkedLive?: boolean;
};

export type Team = {
  winner: boolean;
  disqualified: boolean;
  seedNumber?: number;
  teamID?: string;
  readyAt?: Date;
  score?: number;
  team?: TeamInfo;
};

export type TeamInfo = {
  _id: string;
  name: string;
  pendingTeamID: string;
  persistentTeamID: string;
  tournamentID: TournamentID;
  userID: string;
  customFields: never[];
  ownerID: string;
  createdAt: Date;
  playerIDs: string[];
  captainID: string;
};

export type TournamentID = string;

export type Next = {
  winner: Winner;
};

export type Winner = {
  position: string;
  matchID: string;
};

export type Schedule = {
  startTime: string;
  reschedulingRequested: boolean;
};

export type Stat = {
  matchID: string;
  gameID: string;
  tournamentID: TournamentID;
  stageID: string;
  gameNumber: number;
  stats: Stats;
  createdAt: Date;
  _id: string;
};

export type Stats = {
  isComplete: boolean;
  top: StatsBottom;
  bottom: StatsBottom;
  valorantTeamIDsByPosition: IdByPos;
  valorantMatchID: string;
  teams: TeamElement[];
  gameStartMillis: number;
  gameLengthMillis: number;
  gameId: string;
  mapName: string;
  mapSlug: string;
  totalBombPlantsPerSite: SPerSite;
  totalBombDefusesPerSite: SPerSite;
};

export type StatsBottom = {
  score: number;
  winner: boolean;
};

export type TeamElement = {
  isWinner: boolean;
  teamId: TeamEnum;
  battlefyTeamID: string;
  name: string;
  players: Player[];
  teamPostPlantWinsPerSite: SPerSite;
  teamBombPlantsPerSite: SPerSite;
  teamBombDefusesPerSite: SPerSite;
  teamKills: number;
  teamAssists: number;
  teamDeaths: number;
  teamDamage: number;
  teamKda: number;
};

export type Player = {
  characterId: string;
  character: string;
  puuid: string;
  kills: number;
  deaths: number;
  assists: number;
  rounds: number;
  kda: number;
  bombPlantsPerSite: SPerSite;
  bombDefusesPerSite: SPerSite;
  totalDamage: number;
  teamId: TeamEnum;
  headshots: number;
  bodyshots: number;
  legshots: number;
  totalHits: number;
  headshotPercent: number;
  inGameName: string;
};

export type SPerSite = {
  A?: number;
  B?: number;
  C?: number;
};

export type TeamEnum = "Blue" | "Red";

export type IdByPos = {
  top: TeamEnum;
  bottom: TeamEnum;
};
