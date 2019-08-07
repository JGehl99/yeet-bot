/* eslint-disable */
module.exports = {
	name: 'list',
	description: 'Lists waypoints fro m json file',
	execute(message, args, config) {
        var fs = require('fs');
        var Discord = require('discord.js');
        //Holds parsed data from JSON file
        var data;
        // Reads data from file, parses it, stores it in data
        data = JSON.parse(fs.readFileSync('./wp.json', 'utf8'));

        //Prints formatted JSON object
        console.log("\n\n"+JSON.stringify(data,null,2)+"\n\n");

        // Variables Assignments
        var x = data.x;
        var y = data.y;
        var z = data.z;
        var name = data.name;
        var author = data.author;
        //Waypoint idKey for loop
        var idKey = 1;
        //Create Rich Embed
        const msgEmbed = new Discord.RichEmbed();
        //Add title to embed
        msgEmbed.setTitle("Waypoints");
        //Loop and add a field for every item in the arrays
        //Since all indecies are the same for each array,
        //so this loop can just iterate through one of them
        for (i in data.x){
            //Adds name, coords, and author from json arrays
            msgEmbed.addField((idKey++)+" | "+name[i],x[i]+" | "+y[i]+" | "+z[i]+"\n"+author[i], true);
        }
        //Send message
        message.channel.send(msgEmbed);
    },
};