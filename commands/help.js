module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	execute(message, args) {
		
		const { prefix } = require('../config.json');
		const Discord = require('discord.js');

		const embed = new Discord.RichEmbed()
		.setColor('#0099ff');

		if (!args.length){
			console.log("No Args");
			for(const command of message.client.commands){
				embed.addField(command.name+": ", command.usage, true);
			}
		} else{
			console.log("Args")
			
			reply += `\`${prefix}${command.name} ${command.usage}\``;
		}
	},
};