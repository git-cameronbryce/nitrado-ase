import { db } from "@/app";
import { generate } from "@/app/events/interactionCreate/setup/generate";
import { guildsTable } from "@/app/database/guilds";
import { TokenRouter } from "@/app/routes/token";
import type { EventHandler } from "commandkit";
import { eq } from "drizzle-orm";

// @ts-ignore
const handler: EventHandler<"interactionCreate"> = async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === "modal-token") {
    const token = interaction.fields.getTextInputValue("modal-token");
    const guild = interaction.guildId!;
    await interaction.deferReply();

    // prettier-ignore
    const scopes = (await new TokenRouter(token).get().catch(() => null))
      ?.data.token.scopes;

    if (!scopes || !scopes.includes("service")) {
      return interaction.followUp({
        content: "Token does not have the required scope: service",
        ephemeral: true,
      });
    }

    await db.delete(guildsTable).where(eq(guildsTable.guild, guild));
    await db.insert(guildsTable).values({ guild, token });
    await generate(interaction);

    await interaction.followUp({
      content: `Token setup button clicked: ${token}`,
      ephemeral: true,
    });
  }
};

export default handler;
