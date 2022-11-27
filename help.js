const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle, } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Proporciona informacion del bot (ONLY IN SPANISH)'),

    async execute(int) {

        const now = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Ir a openia.com')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://openai.com/dall-e-2/')
                    .setDisabled(false)
            )


        const emb = new EmbedBuilder()
            .setTitle('🟠TheIABot Informacion🟠')
            .setDescription('🤖Todo lo que debes saber de The CreationIA🤖\n\n👾Creado por: ```n1ghtcE#7979```\n🤖Creado con: ```https://openai.com/dall-e-2/```\n❌NO HACER❌\n```🟢No escribir escribir malas palabras```')
            .setImage('https://i.pinimg.com/originals/0d/7b/8b/0d7b8b55dcbcb2fb3168ef7cf78bf83b.gif')
            .setColor('Orange')

        await int.reply({ embeds: [emb], components: [now] })
    }
}