import { db } from "@/app";
import { builder } from "@/app/services/builders/servers";
import { guildsTable } from "@/app/database/guilds";
import { ServerRouter } from "@/app/routes/server";

import type {
  CommandData,
  CommandMetadata,
  ChatInputCommand,
} from "commandkit";
import { ApplicationCommandOptionType } from "discord.js";

export const command: CommandData = {
  name: "ase-server-stop",
  description: "Stop a server",
  options: [
    {
      name: "id",
      description: "Server id to stop",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],
};

export const chatInput: ChatInputCommand = async (ctx) => {
  await ctx.interaction.deferReply({ flags: "Ephemeral" });
  const input = ctx.interaction.options.getNumber("id")!;

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
  const server = servers.find((s) => s.id === input);

  if (!server) {
    return await ctx.interaction.followUp({
      content: "Server not found",
      flags: "Ephemeral",
    });
  }

  await new ServerRouter(result.token).stop(input);

  const { embed } = builder();
  await ctx.interaction.followUp({ embeds: [embed] });
};

export const metadata: CommandMetadata = {
  guilds: ["1219480518131716126"],
};
