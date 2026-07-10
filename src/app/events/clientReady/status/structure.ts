import type {
  GameserverResponse,
  ServerResponse,
} from "@/app/routes/server/type";
import { ActionRowBuilder } from "discord.js";
import { ButtonBuilder, ButtonStyle } from "discord.js";
type Gameserver = GameserverResponse["data"]["gameserver"];
type Service = ServerResponse["data"]["services"][number];

import { EmbedBuilder } from "discord.js";

function getStatus(status: string): string {
  switch (status) {
    case "started":
      return "`🟢` `Service Started`";
    case "restarting":
      return "`🟠` `Service Restarting`";
    case "Stopping":
      return "`🔴` `Service Stopping`";
    case "Stopped":
      return "`🔴` `Service Stopped`";
    default:
      return "`🟠` `Service Unknown`";
  }
}

function getFooter(current: number): string {
  if (current >= 25) {
    return `Displaying 25 of 25 servers ~ (${current} overflow)`;
  }
  return `Displaying ${current} of 25 servers ~ (0 overflow)`;
}

function getName(name: string): string {
  return name.length > 50 ? `${name.slice(0, 47)}...` : name;
}

function getPlayers(current: number, maximum: number): string {
  return `Players: \`${current ?? 0}/${maximum ?? 0}\``;
}

function getSuspension(suspendingIn: number): string {
  return `<t:${Math.floor(Date.now() / 1000) + suspendingIn}:F>`;
}

export async function structure(
  gs: PromiseSettledResult<Gameserver>[],
  services: Service[],
) {
  let output = "";
  gs.filter((g) => g.status === "fulfilled")
    .sort(
      (a, b) =>
        (b.value.query.player_current ?? 0) -
        (a.value.query.player_current ?? 0),
    )
    .slice(0, 25)
    .forEach((g) => {
      const service = services.find((s) => s.id === g.value.service_id)!;
      output += `${getStatus(g.value.status)}\n${getName(g.value.query.server_name ?? "Gameserver Unavailable")}\n${getPlayers(g.value.query.player_current, g.value.query.player_max)}\nID: ||${g.value.service_id}||\n\n**Subscription Runtime**\n${getSuspension(service.suspending_in)}\n\n`;
    });

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel("Cluster Action")
      .setStyle(ButtonStyle.Success)
      .setCustomId("btn-action"),

    new ButtonBuilder()
      .setLabel("Support Server")
      .setStyle(ButtonStyle.Link)
      .setURL("https://example.com"),
  );

  const embed = new EmbedBuilder()
    .setDescription(
      `${output}<t:${Math.floor(Date.now() / 1000)}:R>\n**Partnership & Information**\nConsider using our partnership link to purchase your gameservers, it will help fund development.`,
    )
    .setImage("https://i.imgur.com/bFyqkUS.png")
    .setColor(0x2ecc71)
    .setFooter({
      text: getFooter(services.length),
    });

  return { embed, row };
}
