import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export function builder(services: number, isClickable: boolean) {
  const embed = new EmbedBuilder()
    .setDescription(`**Pending Action Authorization**\nGrant permission to access your services.\nPerform a cluster-wide server action.\n\`🟠\` ${services} Gameservers Pending\n\n**Additional Information**\nDelete this message to return.`)
    .setColor(0x2ecc71);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setLabel("Restart Cluster").setStyle(ButtonStyle.Success).setCustomId("btn-restart").setDisabled(!isClickable),
    new ButtonBuilder().setLabel("Stop Cluster").setStyle(ButtonStyle.Secondary).setCustomId("btn-stop").setDisabled(!isClickable),
  );

  return { embed, row };
}
