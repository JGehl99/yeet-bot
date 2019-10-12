/* eslint-disable*/

const request = require('request');
const cheerio = require('cheerio');

module.exports = {
	name: 'game',
    description: 'Pulls Link to Steam Game',
    args: "true",
    usage:"<Game Name>",
	execute(message, args) {

        //Holds game title
        var game = "";

        //Prints arguments
        console.log("Arguments: " + args);

        //Converts args into game title thats formatted for steam search url
        for (var x = 0; x < args.length; x++){
            //adds plus between words, but not after the last one
            if (x < args.length-1){
                game = game + args[x] + "+";
            } else{
                game = game + args[x];
            }
        }

        //Sets it to lower case
        game = game.toLowerCase();

        //Prints formatted game title
        console.log("Game: " + game);

        //Sets options for request
        const options = {
            url: 'https://store.steampowered.com/search/?term=' + game,
            method: 'GET'
        }

        //Requests html of search page
        request (options, function(err, res, body) {
            //Pring error if someting goes wrong
            if (err) return console.log(err);

            //Pass body to cheerio
            let $ = cheerio.load(body);

            //Initialize links array
            let links = [];

            //Loops over every <a> element thats in the class .search_result_row
            //Links are stored in these elements under this class
            //Sets links[i] to the value stored in the attribute 'href'
            $('.search_result_row').each((i, v)=>{
                links[i] = $(v).attr('href');
            });

            //Prints links
            //console.log(links);

            //Formats the first 3 links to remove the garbage after the question mark
            try{
                for(var x = 0; x < links.length; x++){
                    for (var y = 0; y < links[x].length; y++){
                        //Finds index of '?' and takes everything before it
                        if (links[x].charAt(y) == '?'){
                            links[x] = links[x].substring(0,y);
                            break;
                        }
                    }
                    //Prints formatted links
                    console.log(links[x]);
                }
            } catch(e){
                message.channel.send("Error - No Ganes Found");
            }
            

            //Sends the first link to the discord channel
            message.channel.send(links[0]);
        });


	},
};