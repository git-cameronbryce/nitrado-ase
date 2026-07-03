import {
  ModalBuilder,
  TextInputStyle,
  TextInputBuilder,
  ActionRowBuilder,
} from "discord.js";
import type { EventHandler } from "commandkit";

const modal = new ModalBuilder({
  title: "Nitrado Token Setup",
  customId: "modal-token",
  components: [
    new ActionRowBuilder<TextInputBuilder>({
      components: [
        new TextInputBuilder({
          placeholder: "2klSHBIHl-4mE038MnnRL9_D0T9LF9v67WcVg6...",
          style: TextInputStyle.Short,
          customId: "modal-token",
          label: "Nitrado Token",
          required: true,
          minLength: 25,
        }),
      ],
    }),
  ],
});

const handler: EventHandler<"interactionCreate"> = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "btn-token") {
    await interaction.showModal(modal);
  }
};

export default handler;
