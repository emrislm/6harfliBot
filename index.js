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
    client.user.setActivity('korona | ::bugun', { 
        type: 'WATCHING',
    });
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

client.login(process.env.BOTTOKEN);