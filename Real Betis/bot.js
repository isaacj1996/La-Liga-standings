// taken from https://gist.github.com/eslachance/3349734a98d30011bb202f47342601d3 
// Load up the discord.js library
const Discord = require("discord.js");
// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();
// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setStatus('dnd')
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  client.user.setStatus('dnd')
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  client.user.setStatus('dnd')
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


client.on('guildCreate', guild => {
  const guildEnt = guild
  client.user.setStatus('dnd')
  client.guilds.get('350647808111411200').channels.get("429352954231783436").sendMessage("I have entered " + guildEnt.name + ". I'm sure happy to be there!\n\n" + "\n Server info: \n Name: " + guildEnt.name + "\n ID: " + guildEnt.id + "\n Member count: " + guildEnt.memberCount)
    });
              
    client.on('guildDelete', guild => {
  var guildEnt = guild
  client.user.setStatus('dnd')
  client.guilds.get('350647808111411200').channels.get("429352954231783436").sendMessage("I have left " + guildEnt.name + ". I wonder why. :thinking:" + "\n Server info: \n Name: " + guildEnt.name + "\n ID: " + guildEnt.id + "\n Member count: " + guildEnt.memberCount)
  });
    

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //defining things, necessary for the switch case 
  const childServer = "290536706132672514"
  //const testServer = "292608164250124290"
  const parentServer = "350647808111411200"
  const teamName = "Real Betis"
  
  //checks if the guild is the parent server
  //checks if the messenger has the "Standings admin" role
  if(message.guild.id == "350647808111411200" && message.member.roles.find("name", "Standings admin")){

 //Position switching
 switch(command){
  case "points":
  //makes so args are not displayed as an array, but joined with an empty space
  const points = args.join(" ");
  /*checks if points is really a number
  *you dont want to see that your bot is "Watching dick points", do you?
  */
   if(isNaN(points)){
  message.reply(points + " is not a number. Try with a value that is a number, not a string. ")
  console.log("User attempted to use the command points, but used a non-number value")
  } else if(!isNaN(points)){ 
  //sets the activity to the const points and sets the type of it to watching
  client.user.setActivity(points + " points" , { type: 'WATCHING' })
  console.log("Points set to " + points)
  message.reply("Points set to " + points)
  fs.appendFile("./graphPoints.txt", points + " ; ", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
}
    break;
  case "position":
  const pos = args.join(" ");
  if(isNaN(pos)){
  message.reply(pos + " is not a number. Try with a value that is a number, not a string. ")
  console.log("User attempted to use the command points, but used a non-number value")
} else if(!isNaN(pos)){ 
  client.guilds.get(childServer).me.setNickname( pos +  " | " + teamName)
  console.log("Position set to " + pos)
  message.reply("Position set to " + pos)
  fs.appendFile("./graphPosition.txt", pos + " ; ", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
 }
    break;
      }
    } else {
      console.log("User without permissions necessary permissions tried to execute a command")
      message.reply("You don't have the necessary permissions to do this action.")
    }
});

client.login(config.token);