module.exports = {
	name: 'yeet',
	description: 'Pings the Yeetcraft Server',
	execute(message, args, config) {
		var ip = config.address.ip;
		var port = config.address.port;
		
		
		//Creates XMLHTTPRequest 
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var request = new XMLHttpRequest();
		const Discord = require('discord.js');
		const fs = require('fs');
		// Requests the JSON file form this site using address from config
		request.open('GET', 'https://api.mcsrvstat.us/2/'+ip+':'+port, true);

		request.onload = function() {
			// If true, then it succeeded in retrieving the JSON file
			if (request.status >= 200 && request.status < 400) {
				
				// Stores the file 
				var data = JSON.parse(request.responseText);
				
				console.log(data);

				
				
				var status = "";
				
				if (data.online){
					status="Online!";
				}
				else{
					status="Offline!";
				}
				
				const exampleEmbed = new Discord.RichEmbed()
					.setColor('#0099ff')
					.setTitle('Server Status')
					.addBlankField()
					.addField('Status:', status);
					

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