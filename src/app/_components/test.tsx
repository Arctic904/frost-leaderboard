"use client";
import { api } from "~/trpc/server";

export default function Home() {
  const dataFetch = async (url: string) => {
    const battlefyData = await api.battlefyFetch.getById.query(url);

    console.log(battlefyData);
  };

  return (
    <input
      type="text"
      onKeyUp={async (event) => {
        if (event.key !== "Enter") return;
        const target = event.target as HTMLInputElement;
        const url = target.value;
        await dataFetch(url);
      }}
    />
  );
}
