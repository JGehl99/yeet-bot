module.exports = {
	name: 'yeet',
	description: 'Pings Stored Server',
	execute(message, args, config) {

		//Store server info in JSON file
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
				
				//Prints Data
				console.log(data);

				var status = "";
				
				//If server is online, add 'Online!' to status, else add 'Offline!'
				if (data.online){
					status="Online!";
				}
				else{
					status="Offline!";
				}
				
				//Create righEmbed message 
				const exampleEmbed = new Discord.RichEmbed()
					.setColor('#0099ff')
					.setTitle('Server Status')
					.addBlankField()
					.addField('Status:', status);
					
					//Send message to discord channel
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