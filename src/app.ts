import { Client } from "discord.js";
import { drizzle } from "drizzle-orm/node-postgres";

const client = new Client({
  intents: ["Guilds"],
});

export default client;

export const db = drizzle(process.env.DATABASE_URL!);
