import type { EventHandler } from "commandkit";

import { builder } from "@/app/builders/status";
import { ServerRouter } from "@/app/routes/server";
import { guildsTable } from "@/app/database/guilds";
import { eq } from "drizzle-orm";
import { db } from "@/app";

const handler: EventHandler<"interactionCreate"> = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "btn-action") {
    await interaction.deferReply();

    const [result] = await db
      .select({ token: guildsTable.token })
      .from(guildsTable)
      .where(eq(guildsTable.guild, interaction.guildId!));

    if (!result) {
      await interaction.followUp({ content: "No token found for this guild." });
      return;
    }

    const services = (await new ServerRouter(result.token).get()).data.services;

    const { embed, row } = builder(services.length, true);
    await interaction.followUp({ embeds: [embed], components: [row] });
  }

  if (interaction.customId === "btn-restart") {
    await interaction.deferReply();

    const [result] = await db
      .select({ token: guildsTable.token })
      .from(guildsTable)
      .where(eq(guildsTable.guild, interaction.guildId!));

    if (!result) {
      await interaction.followUp({ content: "No token found for this guild." });
      return;
    }

    const services = (await new ServerRouter(result.token).get()).data.services;

    for (const service of services) {
      await new ServerRouter(result.token).restart(service.id);
    }

    const message = interaction.message;
    const { embed, row } = builder(services.length, false);
    await message.edit({ embeds: [embed], components: [row] });

    await interaction.followUp({ content: "Cluster restarted successfully." });
  }

  if (interaction.customId === "btn-stop") {
    await interaction.deferReply();
    console.log(interaction.message);

    const [result] = await db
      .select({ token: guildsTable.token })
      .from(guildsTable)
      .where(eq(guildsTable.guild, interaction.guildId!));

    if (!result) {
      await interaction.followUp({ content: "No token found for this guild." });
      return;
    }

    const services = (await new ServerRouter(result.token).get()).data.services;

    for (const service of services) {
      await new ServerRouter(result.token).stop(service.id);
    }

    const message = interaction.message;
    const { embed, row } = builder(services.length, false);
    await message.edit({ embeds: [embed], components: [row] });

    await interaction.followUp({ content: "Cluster stopped successfully." });
  }
};

export default handler;
