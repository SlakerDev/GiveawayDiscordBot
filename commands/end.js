const ms = require('ms');

exports.run = async (client, message, args) => {


    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(":x: Tu n'as pas la permission de finir un gw.");
    }


    if(!args[0]){
        return message.channel.send(':x: Specifie un ID de message valide !');
    }


    let giveaway = 

    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('Impossible de trouver un giveaway pour `'+ args.join(' ') + '`.');
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })

    .then(() => {

        message.channel.send('Giveaway terminé dans '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway avec ID de message ${giveaway.messageID} est déjà terminé.`)){
            message.channel.send('Ce giveaway est déjà terminé !');
        } else {
            console.error(e);
            message.channel.send("Une ereur s'est produite...");
        }
    });

};