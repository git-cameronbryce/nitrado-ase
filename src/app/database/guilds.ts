import { pgTable, text } from "drizzle-orm/pg-core";

export const guildsTable = pgTable("guild", {
  guild: text().primaryKey().notNull(),
  token: text().notNull().unique(),
});

export const discordsTable = pgTable("discord", {
  guild: text()
    .primaryKey()
    .references(() => guildsTable.guild, { onDelete: "cascade" }),

  statusChannel: text().notNull(),
  statusMessage: text().notNull(),
  playerAudits: text().notNull(),
  serverAudits: text().notNull(),

  onlineLogging: text().notNull(),
  adminLogging: text().notNull(),
  chatLogging: text().notNull(),
  joinLogging: text().notNull(),
});
