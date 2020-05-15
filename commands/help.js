module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	execute(message, args, config, commands) {
		
		const { prefix } = require('../config.json');
		const Discord = require('discord.js');

		const embed = new Discord.RichEmbed();

		if (!args.length){
			embed.setTitle("Commands");
			embed.setColor('#0099ff');
			console.log("No Args");
			for(const command of commands){
				embed.addField(command.name+": ", command.usage, true);
			}
			message.channel.send(embed);
			return;
		} else{
			console.log("Args");
			return;
		}

	},
};