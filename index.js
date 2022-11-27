// RECUERDA AGREGAR EL TOKEN Y EL CLIENT ID EN EL ARCHIVO CFG.JSON


const {token, 
    client_id , 
    sClient_id , 
    server_ID} = require('./cfg.json')

require('colors')

const {
    Client , 
    GatewayIntentBits, 
    Collection,
    Events, 
    REST,
    Routes} = require('discord.js')

const fs = require('fs');
const path = require('path');


const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
]}
)



let ring = client.commands = new Collection(); 


const commandsPath = path.join(__dirname, 'comandos'); 
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));


//CAPTURADOR DE COMANDOS

for (const file of commandFiles) {

	const filePath = path.join(commandsPath, file);

	const command = require(filePath);

	if ('data' in command && 'execute' in command) {
		ring.set(command.data.name, command);
	} else {
		console.log(`[CUIDADO] El comando de ${filePath.cyan} requiere una "data" o la propiedad "execute"`.yellow);
	}
    
}

// VERIFICADOR DE COMANDOS


client.on(Events.InteractionCreate, async int => {


    if(!int.isChatInputCommand()) return

    

    const command = int.client.commands.get(int.commandName);


	if (!command) {
		console.error(`No se encontro ningun comando que coincida con ${int.commandName}`.red);
		return;
	}

	try {
		await command.execute(int);
	} catch (error) {
		console.error('[X] ERROR AL EJECUTAR UN COMANDO', error);
		await int.reply({content:'Hubo un error al ejectuar este comando', ephemeral:true});
	}
});


//=======================================================================================




const commands = [];

for (const fMain of commandFiles) {
    
    
	const command = require(`./comandos/${fMain}`);

  
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);


(async () => {


	try {
		console.log(`Comenzando la carga de ${commands.length} comandos (/).`.yellow);

	
		const data = await rest.put(
			Routes.applicationCommands(client_id),
			{ body: commands},
		);

		console.log(`Han cargado correctamente los ${data.length}  unicos comandos (/).`.green);
		
	} catch (err) {

		console.log(`[X] ERROR A LA CARGA DE COMANDOS` + err);
	}
})();



//CAPTURADOR DE EVENTOS

//========================================================================================

const eventsPath = path.join(__dirname, 'eventos');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {

	const filePath = path.join(eventsPath, file);

	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

//========================================================================================



client.login(token)