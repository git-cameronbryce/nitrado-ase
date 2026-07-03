import { db } from "@/app";
import { guildsTable } from "@/app/database/guilds";
import { TokenRouter } from "@/app/routes/token";
import type { EventHandler } from "commandkit";

// @ts-ignore
const handler: EventHandler<"interactionCreate"> = async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "modal-token") {
    const token = interaction.fields.getTextInputValue("modal-token");
    const guild = interaction.guildId!;

    // prettier-ignore
    const scopes = (await new TokenRouter(token).get().catch(() => null))
      ?.data.token.scopes;

    if (!scopes || !scopes.includes("service")) {
      return interaction.reply({
        content: "Token does not have the required scope: service",
        ephemeral: true,
      });
    }

    await db
      .insert(guildsTable)
      .values({ guild, token })
      .onConflictDoUpdate({ target: guildsTable.guild, set: { token } });

    interaction.reply({
      content: `Token setup button clicked: ${token}`,
      ephemeral: true,
    });
  }
};

export default handler;
