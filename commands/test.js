/* eslint-disable*/
module.exports = {
    name: 'test',
    description: 'Tests bot to see if its async or not',
    args:"true",
    usage:"<time in s>",
	execute(message, args, config) {

        setTimeout(function(){ message.channel.send(args[0] + " Seconds is up!"); }, args[0]*1000);

		
	},
};