module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	execute(message, args) {
		
		const { prefix } = require('../config.json');

		console.log(message.client.commands);




	},
};