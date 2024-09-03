const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent
]
})
client.on( 'ready', (c) => {
    console.log(`✔${c.user.tag} is online`);
});

client.on('messageCreate', (message) => {
    if (message.content === 'hello'){
        message.reply('Hey');
        message.reply('')
    }
})


// client.login("Token" > uncomment and add token
);

