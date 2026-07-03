import { EmbedBuilder } from "discord.js";

export function builder(success: number, failed: number) {
  const embed = new EmbedBuilder()
    .setDescription(`**Ark Survival Evolved**\n**Game Command Completed**\nExecuted on \`${success}\` of \`${success + failed}\` servers.\nView audit logging for details.`)
    .setThumbnail("https://i.imgur.com/CzGfRzv.png")
    .setColor(0x2ecc71);

  return { embed };
}
