import { EmbedBuilder } from "discord.js";

export function builder() {
  const embed = new EmbedBuilder()
    .setDescription("**Ark Survival Evolved**\n**Game Command Completed**\nExecuted on `1` of `1` servers.\nView audit logging for details.")
    .setThumbnail("https://i.imgur.com/CzGfRzv.png")
    .setColor(0x2ecc71);

  return { embed };
}
