import type { ChatInputCommand, CommandData } from "commandkit";
import { builder } from "@/app/builders/setup";

export const command: CommandData = {
  name: "ase-setup-cluster",
  description: "Setup process for your cluster",
};

export const chatInput: ChatInputCommand = async (ctx) => {
  const { embed, row } = builder();

  await ctx.interaction.reply({ embeds: [embed], components: [row] });
};
