/* eslint-disable*/

const request = require('request');
const Discord = require('discord.js');

module.exports = {
	name: 'twitch',
    description: 'Shows current info about a twitch streamer',
    args: "true",
    usage:"<Twitch Username>",
	execute(message, args, config) {

        //Prints arguments
        console.log("Arguments: " + args);
        console.log('https://api.twitch.tv/helix/streams?user_login=' + args[0]);

        var streamData;
        var gameData;
        var userData;

        getStreamData((err)=>{
            if (err){
                console.log(err);
            }else if (!(Array.isArray(streamData.data) && streamData.data.length)){
                console.log("Streamer is offline!");
                message.channel.send(args[0] + 'is offline!');
            } else{
                getGameData((err)=>{
                    if (err){
                        console.log(err);
                    } else{
                        getUserData((err)=>{
                            if (err){
                                console.log(err);
                            } else{
                                showInfo();
                            }
                        });
                    }
                });
            }
        });




        function showInfo(){

            console.log(streamData);
            console.log(gameData);
            console.log(userData);

            gameData.data[0].box_art_url = gameData.data[0].box_art_url.replace("{height}","1000");
            gameData.data[0].box_art_url = gameData.data[0].box_art_url.replace("{width}","1000");

            if (Array.isArray(streamData.data) && streamData.data.length){

                const embed = new Discord.RichEmbed()
                    .setColor('#0099ff')
                    .addField("Name: ",streamData.data[0].user_name)
                    .addField("Title: ",streamData.data[0].title)
                    .addField('Game: ', gameData.data[0].name)
                    .addBlankField()
                    .addField('Viewers: ', streamData.data[0].viewer_count)
                    .setThumbnail(gameData.data[0].box_art_url);


                message.channel.send(embed);
            } else{
                message.channel.send(args[0] + ' is offline!');
            }
        }

        
    


        function getStreamData(callback){

            //Sets options for request
            const options = {
                url: 'https://api.twitch.tv/helix/streams?user_login=' + args[0],
                method: 'GET',
                headers:{
                    'Client-ID': config.clientID
                }
            }

            request (options, function(err, res, body) {
                //Print error if someting goes wrong
                if (err) return console.log(err);
                streamData = JSON.parse(body);
                callback(null);
            });

            

        }

        function getGameData(callback){

            const options = {
                url:'https://api.twitch.tv/helix/games?id=' + streamData.data[0].game_id,
                method:'GET',
                headers:{
                    'Client-ID': config.clientID
                }
            }

            request (options, function req(err, res, body) {
                //Print error if someting goes wrong
                if (err) return console.log(err);
                gameData = JSON.parse(body);
                callback(null);
            });

            
            
        }
        function getUserData(callback){

            const options = {
                url:'https://api.twitch.tv/helix/users&id=' + streamData.data[0].user_id,
                method:'GET',
                headers:{
                    'Client-ID': config.clientID
                }
            }

            request (options, function req(err, res, body) {
                //Print error if someting goes wrong
                if (err) return console.log(err);
                userData = JSON.parse(body);
                callback(null);
            });
        }
	},
};