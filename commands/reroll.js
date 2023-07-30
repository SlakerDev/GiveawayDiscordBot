const ms = require('ms');

exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(":x: Tu n'as pas les perms nessécaires pour reroll un gw.");
    }

    if(!args[0]){
        return message.channel.send(':x: Specifie un ID de message valide !');
    }

    let giveaway = 

    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('Impossible de trouver un giveaway pour `'+ args.join(' ') +'`.');
    }

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {

        message.channel.send('Giveaway reroll !');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway ID ${giveaway.messageID} n'est pas terminé.`)){
            message.channel.send("Ce gw n'est pas terminé !");
        } else {
            console.error(e);
            message.channel.send("Une erreur s'est produite...");
        }
    });

};