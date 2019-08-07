/* eslint-disable*/
module.exports = {
    name: 'del',
    description: 'Deletes waypoint from json file',
    args:"true",
    usage:"<ID of Waypoint>",
	execute(message, args, config) {
		var fs = require('fs');
        var Discord = require('discord.js');
        //Holds parsed data from JSON file
        var data;
        var key = -1;

        if (!isNaN(args[0])){
            key = parseInt(args[0]);
            console.log("id: "+key);
		}
		else{
            //Throw error, alpha character found, please try again
			console.log("Alpha character detected in coordinates!\nPlease try again.");
			message.channel.send("Alpha character detected in coordinates!\nPlease try again.");
			return; //Exits command script to force user for correct data
        }

        // Reads data from file, parses it, stores it in data
        data = JSON.parse(fs.readFileSync('./wp.json', 'utf8'));

        //Prints formatted JSON object
        console.log("\n\n"+JSON.stringify(data,null,2)+"\n\n");
        
        for (i = 0 ; i <(data.name.length) ; i++){
            console.log("---");
            if ((i+1) == key){
                console.log("current id: "+i);
                data.x.splice(i,1);
                data.y.splice(i,1);
                data.z.splice(i,1);
                data.name.splice(i,1);
                data.author.splice(i,1);
                console.log("Broke at " + (i+1));
                message.channel.send("Waypoint #" + (i+1) + " deleted!");
                break;
            }
            
        }

        console.log("\n\n"+JSON.stringify(data,null,2)+"\n\n");

        fs.writeFileSync('./wp.json',JSON.stringify(data,null,2));
	},
};