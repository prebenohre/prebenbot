require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

// Henter token fra .env-filen
const token = process.env.DISCORD_TOKEN;

// Oppretter en ny Discord klient
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {
  console.log("Prebenbot er online!");
});

// Håndterer nye medlemmer som blir med i serveren
client.on("guildMemberAdd", (member) => {
  member
    .send(`Velkommen til serveren, ${member.displayName}!`)
    .catch((e) =>
      console.error(`Kunne ikke sende DM til ${member.displayName}:`, e),
    );
});

// Håndterer kommandoer
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    interaction.editReply(
      `Pong! (Svartid: ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms)`,
    );
  }
});

// Logger inn boten med token fra .env-filen
client.login(token);
