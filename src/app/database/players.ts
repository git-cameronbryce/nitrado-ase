import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { serversTable } from "@/app/database/servers";

export const playersTable = pgTable("players", {
  server: integer()
    .references(() => serversTable.server, { onDelete: "cascade" })
    .notNull(),

  uuid: text().primaryKey().notNull(),
  name: text().notNull(),
});
