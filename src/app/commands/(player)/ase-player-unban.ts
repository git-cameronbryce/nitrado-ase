import { db } from "@/app";
import { builder } from "@/app/builders/player";
import { guildsTable } from "@/app/database/guilds";
import { PlayerRouter } from "@/app/routes/player";
import { ServerRouter } from "@/app/routes/server";

import type {
  CommandData,
  CommandMetadata,
  ChatInputCommand,
} from "commandkit";
import { ApplicationCommandOptionType } from "discord.js";

export const command: CommandData = {
  name: "ase-player-unban",
  description: "Unban a player from your cluster",
  options: [
    {
      name: "tag",
      description: "Player tag to ban",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
};

export const chatInput: ChatInputCommand = async (ctx) => {
  await ctx.interaction.deferReply({ flags: "Ephemeral" });
  const input = ctx.interaction.options.getString("tag")!;

  const [result] = await db
    .select({ token: guildsTable.token })
    .from(guildsTable);

  if (!result?.token) {
    return await ctx.interaction.followUp({
      content: "No token found",
      flags: "Ephemeral",
    });
  }

  const servers = (await new ServerRouter(result.token).get()).data.services;
  const player = new PlayerRouter(result.token);

  const results = await Promise.allSettled(
    servers.map(async (s) => {
      return await player.unban(input, s.id);
    }),
  );

  const success = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  const { embed } = builder(success, failed);
  await ctx.interaction.followUp({ embeds: [embed] });
};

export const metadata: CommandMetadata = {
  guilds: ["1219480518131716126"],
};
