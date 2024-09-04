require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const { Client, IntentsBitField,  EmbedBuilder, Events, ModalBuilder } = require('discord.js');


const supabaseUrl = 'https://bisejydbmlvtuwahwjtl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpc2VqeWRibWx2dHV3YWh3anRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzOTA3NjEsImV4cCI6MjA0MDk2Njc2MX0.nARJn_nxAIHMeoKGpkiriXinK_zOpSkwR25CheWaCt0';

const supabase = createClient(supabaseUrl, supabaseKey);

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        const modal = new ModalBuilder(
            .setCustomId('Imouto')
            .setTitle('Imouto model')
    }
})


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

//client.on('messageCreate', (message) => {
//   if (message.content === 'hello'){
//     message.reply('Hey');
//if (message.author.bot){
//return}
//}
//})


    client.on('messageCreate', (message) => {
    if (message.content === 'hello' || message.content === 'Hello'){
    message.reply('Hey');
    if (message.author.bot){
        return
    }
}
})

    client.on('messageCreate', (message) => {
    if (message.content === '/Imouto' || message.content === '/imouto'){
    message.reply ({ files: [{ attachment: 'pictures/comfy.png' }] }) ;
    if (message.author.bot){
        return
        }
_}})

    client.on('messageCreate', (message) => {
    if (message.content === '/Picture' || message.content === '/picture'){
    message.reply ({files: [{ attachment: 'pictures/screenshot_9.png'}] });
    if (message.author.bot){
        return
        }
}})

    //DOES THE EMBEDED CARD REGISTRATION // DOES THE EMBEDED CARD REGISTRATION // DOES THE EMBEDED CARD REGISTRATION // DOES THE EMBEDED CARD REGISTRATION // DOES THE EMBEDED CARD REGISTRATION // 
    //DOES THE EMBEDED CARD REGISTRATION // DOES THE EMBEDED CARD REGISTRATION // DOES THE EMBEDED CARD REGISTRATION // DOES THE EMBEDED CARD REGISTRATION // DOES THE EMBEDED CARD REGISTRATION // 

    function createProfileEmbed(title, field1Name, field1Value, field2Name, field2Value) {
        return new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(title)
            .setDescription('Your good Imouto Description')
            .setThumbnail('attachment://pictures/screenshot_9.png')
            .addFields(
                { name: field1Name, value: field1Value },
                { name: '\u200B', value: '\u200B' },
                { name: field2Name, value: field2Value, inline: true },
            )
            .setImage('attachment://pictures/comfy.png')
            .setTimestamp()
            .setFooter({ text: 'Imouto©', iconURL: 'attachment://pictures/comfy.png' });
    }
    
    // Listening to messages
    client.on('messageCreate', async (message) => {
        if (message.author.bot) return;

        if (message.content.startsWith('!profile')) {
            const userId = message.author.id;
    
            // Fetch the user's profile from Supabase
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', userId)
                .single();
    
            if (error && error.code !== 'PGRST116') { // Error code PGRST116 means no rows returned
                console.error(error.message);
                return;
            }
    
            if (profile) {
                await message.channel.send('You already have a profile, do you want to update it? (yes/no)');
                const confirm = await message.channel.awaitMessages({ max: 1, time: 30000, errors: ['time'] })
                    .then(collected => collected.first().content.toLowerCase())
                    .catch(() => message.channel.send('You didn’t reply in time.'));
    
                if (confirm !== 'yes') return;
            }
    
            // Collect user inputs
            const prompt = async (question) => {
                await message.channel.send(question);
                return message.channel.awaitMessages({
                    max: 1,
                    time: 30000,
                    errors: ['time'],
                    filter: response => response.author.id ===  message.author.id,
                }).then(collected => collected.first().content)
                .catch(() => {
                    message.channel.send('You didn’t reply in time.');
                    return null;
                });
          };
          const title = await prompt('What will the embed name be?');
          if (!title) return;
    
            const field1Name = await prompt('What will be the title of the first field?');
            if (!field1Name) return;
    
           const field1Value = await prompt ('What will be the description of the first field?');
           if (!field1Value) return;
    
           const field2Name = await prompt('What will be the title of the second field?');
           if (!field2Name) return;
    
           const field2Value = await prompt('What will be the description of the second field?');
           if (!field2Value) return;
    
            // Save or update the profile in Supabase
            if (profile) {
                const { error: updateError } = await supabase
                    .from('profiles')
                    .update({ title, field1_name: field1Name, field1_value: field1Value, field2_name: field2Name, field2_value: field2Value })
                    .eq('user_id', userId);
    
                if (updateError) {
                    console.error(updateError.message);
                    return;
                }
            } else {
                const { error: insertError } = await supabase
                    .from('profiles')
                    .insert([{ user_id: userId, title, field1_name: field1Name, field1_value: field1Value, field2_name: field2Name, field2_value: field2Value }]);
    
                if (insertError) {
                    console.error(insertError.message);
                    return;
                }
            }
    
            // Create the embed with user inputs
            const profileEmbed = createProfileEmbed(title, field1Name, field1Value, field2Name, field2Value);
            message.channel.send({ embeds: [profileEmbed] });
            if (message.author.bot){
                return
            }
        }
    });
    
    // Login to Discord with your client's token
 

client.login(process.env.TOKEN)

