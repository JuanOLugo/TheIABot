const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { Configuration, OpenAIApi } = require('openai')





module.exports = {
    data: new SlashCommandBuilder()
        .setName('ia')
        .setDescription('Ingresa lo que desees generar con la IA')
        .addStringOption(option =>
            option
                .setName('texto')
                .setDescription('Ingresa el texto de lo que desees generar')
                .setRequired(true)),

    async execute(int) {

        const text = int.options.getString('texto')

        try {
            const config = new Configuration({ apiKey: 'API_KEY' })

            const openai = new OpenAIApi(config)

            const prompt = text

            await int.deferReply({ ephemeral: false });

            const result = await openai.createImage({ prompt, n: 1, size: '1024x1024', user: 'USERNAME_OPENAI' })

            const url = result

            const emb = new EmbedBuilder()
                .setTitle('😎IMAGEN CON INTELIGENCIA ARTIFICIAL🤖')
                .setDescription('🟢 ' + text + ' 🟢')
                .setImage(url.data.data[0].url)
                .setColor('Orange')


            const resp = { embeds: [emb] };

            await int.editReply(resp)


        } catch (error) {

            const embErr = new EmbedBuilder()
                .setTitle('❌ERROR AL EJECUTAR ESTE COMANDO❌')
                .setDescription('Al parecer ingresaste una mala palabra u otra cosa, ten cuidado con lo que escribes')
                .setImage('https://media.tenor.com/hwe3vkln0_UAAAAM/error-x-error.gif')
                .setColor('Orange')

            const reply = { embeds: [embErr] }
            await int.editReply(reply)
        }

    }


}
