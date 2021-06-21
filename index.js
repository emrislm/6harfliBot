const Discord = require('discord.js');
const fs = require('fs');

const client = new Discord.Client();
const prefix = '::';

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('bot yasiyor!!');
});

client.on('message', async message => {
    if ((!message.content.startsWith(prefix)) || (message.author.bot)) return;

    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift();

    //BUTUN COMMANDLAR
    if(command === 'bugun') {
        client.commands.get('bugun').execute(message, args, Discord);
    }
});

client.login("ODU2MTc3Mzc1NjYyMTc4MzU1.YM9PUQ.uEQHDKoTP-mDBXg28Rq6ma6KjOU");