var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Discord = require('discord.js');
const fs = require('fs');



module.exports = {
	name: 'meme',
	description: 'Sends a reddit meme',
	execute(message, args, config) { 

		var request = new XMLHttpRequest();
		var subreddit = "";
		
		//Checks if there is an argument (specific subreddit)
		// If true, add slash beforehand so it can be concatenated onto the link below
		if (args[0]!=null){
			subreddit = "/" + args[0];
		}


		// Requests the JSON file form this site using link to an api and (optiona) subreddit
		request.open('GET', 'https://meme-api.herokuapp.com/gimme' + subreddit, true);

		request.onload = function() {
			// If true, then it succeeded in retrieving the JSON file
			if (request.status >= 200 && request.status < 400) {
				
				// Stores the file 
				var data = JSON.parse(request.responseText);
				
				//Prints data
				console.log(data);
				
				//Creats richEmbed message out of data
				const msg = new Discord.RichEmbed()
					.setColor('#34007d')
					.setTitle(data.title)
					.setURL(data.postLink)
					.setDescription(data.subreddit)
					.setImage(data.url)
					
					//Sends Message
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