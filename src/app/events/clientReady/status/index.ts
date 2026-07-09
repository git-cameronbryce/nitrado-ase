import type { EventHandler } from "commandkit";

import { db } from "@/app";
import { discordsTable, guildsTable } from "@/app/database/guilds";
import { ServerRouter } from "@/app/routes/server";
import { structure } from "@/app/events/clientReady/status/structure";
import { eq } from "drizzle-orm";

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

        const message = await channel.messages.fetch(discord.statusMessage);
        await message.edit({ embeds: [await structure(gs, services)] });
      });
    } catch (error) {
      console.error("Failed to update status:", error);
    }

    setTimeout(loop, 30_000);
  };

  loop();
};

export default handler;
