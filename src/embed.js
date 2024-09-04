const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

function createProfileEmbed (title, field1name, field1Value, field2Name, field2Value){
    return new EmbedBuilder()
.setColor(0x0099FF)
.setTitle(title)
.setURL('https://discord.js.org/')
	.setDescription('')
	.setThumbnail('attachment://pictures/screenshot_9.png' )
    .addFields(
		{ name: 'field1Name ', value: 'field1Value' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'field2Name', value: 'field2Value', inline: true },
    )
	.setImage('attachment://pictures/comfy.png')
	.setTimestamp()
	.setFooter({ text: 'Imouto©', Files : [ { Attachment:'pictures/comfy.png'}] });
}
    channel.send({ embeds: [exampleEmbed] });

    // listening user
    client.on('messageCreate', async (message) => {

        if (message.content.startsWith('!profile')){

            message.channel.send('What will the embed name be')
            const title = await message.channel.awaitMessages({ max: 1, time: 30000}).then(collected.first().content)

            message.channel.send('What will be the title of the first field')
            const field1name = await message.channel.awaitMessages({ max: 1, time: 30000}).then(collected.first().content)

            message.channel.send('What will be the description of the first field');
            const field1Value = await message.channel.awaitMessages({ max: 1, time: 30000}).then(collected.first().content)

            message.channel.send('What will be the title of the second field');
            const field2Name = await message.channel.awaitMessages({ max: 1, time: 30000}).then(collected.first().content)

            message.channel.send('What will be the description of the second field');
            const field2Value = await message.channel.awaitMessages({ max: 1, time: 30000}).then(collected.first().content)

            // create the embed with user inputs
            const profileEmbed = createProfileEmbed(title, field1Name, field1Value, field2Name, field2Value)

            message.channel.send({ embeds: [profileEmbed] })

        }}
    )