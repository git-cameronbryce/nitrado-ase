import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export function builder() {
  const embed = new EmbedBuilder()
    .setDescription("**Ark Survival Evolved**\n**Account Setup & Overview**\nTo begin the setup process, you will need to obtain your token following this [video preview](https://example.com) allowing us to directly connect to your cluster. \n\n**Additional Information**\nEnsure this guild is a [community](https://example.com) server, allowing us to create forums and threads for logging data.")
    .setImage("https://i.imgur.com/bFyqkUS.png")
    .setColor(0x2ecc71);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder().setLabel("Setup Token").setStyle(ButtonStyle.Success).setCustomId("btn-token"),
    new ButtonBuilder().setLabel("Support Server").setStyle(ButtonStyle.Link).setURL("https://example.com"),
  );

  return { embed, row };
}
