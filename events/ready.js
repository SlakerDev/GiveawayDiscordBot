module.exports = (client) => {
  console.log(
    `Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`
  );

  const activities = [`Giveaways dans ${client.guilds.cache.size} serveurs`,"!help",`over ${client.users.cache.size} users!`];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity("prefix : !", { type: "PLAYING" });
  }, 20000);

};
