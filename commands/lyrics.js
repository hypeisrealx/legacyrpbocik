const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
const { LOCALE } = require("../util/EvobotUtil");
const i18n = require("i18n");

i18n.setLocale(LOCALE);

module.exports = {
  name: "tekst",
  aliases: ["tk"],
  description: i18n.__("lyrics.description"),
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send(i18n.__("lyrics.errorNotQueue")).catch(console.error);

    let lyrics = null;
    const title = queue.songs[0].title;
    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = i18n.__mf("lyrics.lyricsNotFound", { title: title });
    } catch (error) {
      Tekst = i18n.__mf("lyrics.lyricsNotFound", { title: title });
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("lyrics.embedTitle", { title: title }))
      .setDescription(lyrics)
      .setColor("#000000")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
      lyricsEmbed.setFooter('Oficjalny bot LegacyRP!');
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
