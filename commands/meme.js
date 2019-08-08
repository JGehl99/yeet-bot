module.exports = {
	name: 'yeet',
	description: 'Pings the Yeetcraft Server',
	execute(message, args, config) {
		//Creates XMLHTTPRequest 
		var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
		var request = new XMLHttpRequest();
		const Discord = require('discord.js');
		const fs = require('fs');
		// Requests the JSON file form this site using address from config
		request.open('GET', 'https://meme-api.herokuapp.com/gimme', true);

		request.onload = function() {
			// If true, then it succeeded in retrieving the JSON file
			if (request.status >= 200 && request.status < 400) {
				
				// Stores the file 
				var data = JSON.parse(request.responseText);
				
                console.log(data);
                
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