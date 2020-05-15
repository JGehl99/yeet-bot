//=====================================================================
// Name: Joshua Gehl
// Date Created: June 18th / 2019
//
// Desc: This is my first discord bot and I plan to update it with
//       new features on the regular.
//
// Legal: This software may only be redistributed WITH MY PERMISSION
//        I give permission for this code to be modified by others
//        for their personal use 
//=====================================================================



//Requires
const Discord = require('discord.js');
//Creates Client
const client = new Discord.Client();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const request = require('request');
const config = require("./config.json");
const fs = require('fs');
const { prefix } = require('./config.json');


//Creates collection
client.commands = new Discord.Collection();

// fs.readdirSync will return an array of file names in the directory
// filter only retrieves files that are .js

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Performs a require command for every file in the list
// Sets commands from list
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Logs bot in
client.login(config.token);

client.on('guildMemberAdd',member=>{
	console.log('User' + member.user.username + 'Has Joined the server!');
	member.addRole("Members");
});

// If message is sent. trigger
client.on('message', message => {
	
	// If message doesn't start with prefix, or if message 
	// is sent by bot, return null
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	// Remove prefix and store command
	const args = message.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	// If the command doesn't exist, return null
	//TODO: Add wrong command message
	if (!client.commands.has(commandName)) return;

	

	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		let reply = ``;

		if (command.usage) {
			reply += `\`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
		

	// Try to execute command
	try {
		command.execute(message, args, config, client.commands);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	
});


