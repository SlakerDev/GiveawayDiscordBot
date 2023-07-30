const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: You need to have the manage messages permissions to start giveaways.');
    }

    let giveawayChannel = message.mentions.channels.first();

    if(!giveawayChannel){
        return message.channel.send(':x: You have to mention a valid channel!');
    }

    let giveawayDuration = args[1];

    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: You have to specify a valid duration!');
    }

    let giveawayNumberWinners = args[2];

    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: You have to specify a valid number of winners!');
    }


    let giveawayPrize = args.slice(3).join(' ');

    if(!giveawayPrize){
        return message.channel.send(':x: You have to specify a valid prize!');
    }


    client.giveawaysManager.start(giveawayChannel, {

        time: ms(giveawayDuration),

        prize: giveawayPrize,

        winnerCount: parseInt(giveawayNumberWinners),

        hostedBy: client.config.hostedBy ? message.author : null,

        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY** 🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉 **GIVEAWAY TERMINE** 🎉",
            timeRemaining: "Temps restant : **{duration}**!",
            inviteToParticipate: "Reagis avec 🎈 pour participer!",
            winMessage: "Bravo {winners}! Tu as gagné **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway annjulé, aucune participation n'est valide.",
            hostedBy: "Host par : {user}",
            winners: "gagnant(s)",
            endedAt: "Ended at",
            units: {
                seconds: "secondes",
                minutes: "minutes",
                hours: "heures",
                days: "jours",
                pluralS: false 
            }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);

};
