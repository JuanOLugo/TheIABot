require('colors')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`El bot `.blue + client.user.tag.red + ` esta listo para usarse`.blue);
	},
};