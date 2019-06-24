/*TODO

	- Find a fix for the data.debug.dns.a[0].host error
	- Use Embeds to make everything look nicer
	- Redo the players online loop to only show a max of 10 usernames
	- Create a new command.js file specifically for YEETcraft, set this one to only arguments
	- Add expected command usage
	
*/

module.exports = {
	name: 'ping',
	description: 'Gets info about a server from a JSON file online',
	execute(message, args, config) {
		
		var ip = "";
		var port = "";
		
		if(args[0]!=null&&args[1]!=null){
			ip = args[0];
			port = ":"+args[1];
		}
		else if (args[0]!=null&&args[1]==null){
			ip = args[0];
		}
		else{
			ip = config.address.host;
			port = ":"+config.address.port;
		}	
		
		var link = "https://api.mcsrvstat.us/2/"+ip+port;
		console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n==================================================\n");
		console.log(link);
		console.log("\n==================================================\n");
		
		
		//Creates XMLHTTPRequest 
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var request = new XMLHttpRequest();
		const Discord = require('discord.js');
		const fs = require('fs');
		// Requests the JSON file form this site using address from config
		request.open('GET', 'https://api.mcsrvstat.us/2/'+ip+port, true);

		request.onload = function() {
			// If true, then it succeeded in retrieving the JSON file
			if (request.status >= 200 && request.status < 400) {
				
				// Stores the file 
				var data = JSON.parse(request.responseText);
				
				console.log(data);
				
				

				if (data.icon!=null){
				
					var imageData = data.icon.replace(/^data:image\/\w+;base64,/, '');
					fs.writeFile("icon.png", imageData, {encoding: 'base64'}, function(err){
						//Finished
					});
				}
				else{
					var imageData = config.icon
					fs.writeFile("icon.png", imageData, {encoding: 'base64'}, function(err){
						//Finished
					});
				}
				
				var status = "";
				
				if (data.online){
					status="Online!";
				}
				else{
					status="Offline!";
				}
				
				var online = data.players.online;
				
				if (online!=null){
					var players = "";
					
					if (data.players.list!=null){
					
						for (var x = 0;x<6;x++){
							if (data.players.list[x]!=null){
								players += data.players.list[x]+"\n";
							}
						}
						if (data.players.list[6]!=null){
							players += "\nand "+online+" more!";
						}
					}
					else{
						players += "There are "+online+ " players online!";
					}
				}
				else{
					var players = "No one is playing!";	
				}
				
				var motd = data.motd.clean;
				
				var version = data.version;
				
				const exampleEmbed = new Discord.RichEmbed()
					.setColor('#0099ff')
					.addField('IP: ',data.debug.dns.a[0].host+port)
					.addField('Status:', status)
					.addField('Version: ',version)
					.addField('MOTD: ', motd)
					.addBlankField()
					.addField('Players Online: ', players)
					.attachFiles(['./icon.png'])
					.setThumbnail('attachment://icon.png');
					
					

					message.channel.send(exampleEmbed);
				
		  } else {
				// We reached our target server, but it returned an error
				message.reply("\n\nReturned Error");
		  }
		};

		request.onerror = function() {
			// There was a connection error of some sort
			message.reply("\n\nConnection Error");
		};

		request.send();
	},
};