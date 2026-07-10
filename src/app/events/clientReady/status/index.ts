import type { EventHandler } from "commandkit";

import { structure } from "@/app/events/clientReady/status/structure";
import { discordsTable, guildsTable } from "@/app/database/guilds";
import { ServerRouter } from "@/app/routes/server";
import { eq } from "drizzle-orm";
import { db } from "@/app";

const handler: EventHandler<"clientReady"> = async (client) => {
  const loop = async () => {
    try {
      const results = await db
        .select({ guild: guildsTable.guild, token: guildsTable.token })
        .from(guildsTable);

      results.map(async (r) => {
        const servers = await new ServerRouter(r.token).get();
        const { services } = servers.data;

        const gs = await Promise.allSettled(
          services.map(async (s) => {
            return (await new ServerRouter(r.token).gameserver(s.id)).data
              .gameserver;
          }),
        );

        const [discord] = await db
          .select()
          .from(discordsTable)
          .where(eq(discordsTable.guild, r.guild));

        if (!discord) return;

        const channel = await client.channels.fetch(discord.statusChannel);
        if (!channel?.isTextBased()) return;

        const { embed, row } = await structure(gs, services);
        const message = await channel.messages.fetch(discord.statusMessage);
        await message.edit({ embeds: [embed], components: [row] });
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }

    setTimeout(loop, 30_000);
  };

  loop();
};

export default handler;
