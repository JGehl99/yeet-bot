/* eslint-disable*/
module.exports = {
	name: 'add',
    description: 'Stores waypoint in json file',
    args: "true",
    usage:" <Name> <X> <Y> <Z>",
	execute(message, args) {

        var fs = require('fs');

		// Coordinates of waypoint
		var xC = 0,yC = 0,zC = 0;
		// Name of waypoint
		var coordName = args[0];
		//Username of bot invoker
        var author = message.member.nickname;
        //Holds parsed data from the JSON file
        var parsedData;

		//If ALL 3 coordinate arguments are only numeric characters,
		//Then set args==coords
		//Else display error (discord message) and exit script
		if (!isNaN(args[1]) && !isNaN(args[2]) && !isNaN(args[3])){
			console.log(args[1] + " " + args[2] + " " + args[3]);
			xC= args[1];
			yC = args[2];
			zC = args[3];
		}
		else{
            //Throw error, alpha character found, please try again
			console.log("Alpha character detected in coordinates!\nPlease try again.");
			message.channel.send("Alpha character detected in coordinates!\nPlease try again.");
			return; //Exits command script to force user for correct data
		}
		
		//Debug info, messages all data to channel
        //message.channel.send("Name: " + coordName + "\n" + "XYZ: " + xC + " "+ yC + " " + zC);
        
        //Data being read from a JSON file and parsed, then stored in parsedData
        parsedData = JSON.parse(fs.readFileSync('./wp.json', 'utf8'));
        //Prints data in JSON formatting to console
        console.log("\n\n"+JSON.stringify(parsedData,null,2)+"\n\n");

        //Pushes each bit of data to the correct array in the JSON object
        parsedData.x.push(xC);
        parsedData.y.push(yC);
        parsedData.z.push(zC);
        parsedData.name.push(coordName);
        parsedData.author.push(author);

        //Writes JSON object to wp.json and formats it accordingly
        fs.writeFileSync('./wp.json',JSON.stringify(parsedData,null,2));
        
        message.channel.send("Waypoint added!");

	},
};