import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { guildsTable } from "@/app/database/guilds";

export const serversTable = pgTable("servers", {
  guild: text()
    .references(() => guildsTable.guild, { onDelete: "cascade" })
    .notNull(),

  server: integer().primaryKey().notNull(),
});
