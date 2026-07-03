import { pgTable, text } from "drizzle-orm/pg-core";

export const guildsTable = pgTable("guild", {
  guild: text().primaryKey().notNull(),
  token: text().notNull(),
});
