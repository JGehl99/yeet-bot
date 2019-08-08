module.exports = {
	name: 'meme',
	description: 'Sends a reddit meme',
	execute(message, args, config) {
		//Creates XMLHTTPRequest 
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var request = new XMLHttpRequest();
		const Discord = require('discord.js');
		const fs = require('fs');

		console.log(args);
		var subreddit = ""
		if (args[0]!=null){
			subreddit = "/" + args[0];
		}


		// Requests the JSON file form this site using address from config
		request.open('GET', 'https://meme-api.herokuapp.com/gimme' + subreddit, true);

		request.onload = function() {
			// If true, then it succeeded in retrieving the JSON file
			if (request.status >= 200 && request.status < 400) {
				
				// Stores the file 
				var data = JSON.parse(request.responseText);
				
				console.log(data);
				
				const msg = new Discord.RichEmbed()
					.setColor('#34007d')
					.setTitle(data.title)
					.setURL(data.postLink)
					.setDescription(data.subreddit)
					.setImage(data.url)
					
					
					message.channel.send(msg);
                
            } else {
                    // We reached our target server, but it returned an error
					console.log("Error");
					message.reply("\n\nReturned Error");
            }
		};

		request.onerror = function() {
			// There was a connection error of some sort
			console.log("Error");
			message.reply("\n\nConnection Error");
		};

		request.send();
	},
};