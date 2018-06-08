const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

var prefix = "+";
var token = "NDU0NTEzMDgwOTE5OTE2NTQ2.Dfuhzw.qm1VipeLgFG0868TfXuxmBPmxk0"
var message1 = "Our ticket team will be with you ASAP!";

client.on("ready", () => {
  console.log("CashCord | Logged in! Server count: ${client.guilds.size}");
  client.user.setGame(`+help  | Ticketpro BETA v0.0.1`);
});

client.on("guildCreate", (guild) => {
client.user.setGame(`+help | Ticketpro BETA`);
    guild.owner.user.send(`Thanks for adding Ticket Pro, the ticket bot reinvented! +help`);
    message.channel.sendMessage(`Thanks for adding Ticket Pro, the ticket bot reinvented! +help`);
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `help`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: Ticket Pro Help`)
    .setColor(0xCF40FA)
    .setDescription(`TicketPro Beta `)
    .addField(`Create a ticket`, `[${prefix}new]() > Opens up a new channel! [${prefix}close]() > Closes the ticket channel`)
    .addField(`Other`, `[${prefix}help]() > Shows you this help menu your reading\n[${prefix}ping]() > Pings the bot to see how long it takes to react\n[${prefix}about]() > Tells you all about Ticket Pro\n[${prefix}setmessage]() > {IN PROGRESS} sets message to users in ticket when ticket is created`)
    message.channel.send({ embed: embed });
  }

  if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
    message.channel.send(`Grabbing!!`).then(m => {
    m.edit(`:ping_pong:! Ticket Pro is alive! **Pong!**\nMessage edit time is ` + (m.createdTimestamp - message.createdTimestamp));
    });
}
if (message.content.toLowerCase().startsWith(prefix + `invite`)) {
    message.channel.send(`Sending!!!`).then(m => {
    m.edit(`Feel free to add TicketPro to your server! https://discordapp.com/api/oauth2/authorize?client_id=454513080919916546&permissions=8&scope=bot`);
    });
}
if (message.content.toLowerCase().startsWith(prefix + `about`)) {
    message.channel.send(`what`).then(m => {
    m.edit(`TicketPro was launched in June 2018 by nolan#0002 as a ticket system thats completly free and customisable!`);
    });
}
if (message.content.toLowerCase().startsWith(prefix + `setmessage`)) {
   // const message2 = args.join(" ");
    message.channel.sendMessage(`Coming soon!`);
}


if (message.content.toLowerCase().startsWith(prefix + `new`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Ticket Team")) return message.channel.send(`This server doesn't have a \`Ticket Team\` role made, so the game channel won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticketpro-" + message.author.id)) return message.channel.send(`You already have a ticket  open.`);
    message.guild.createChannel(`ticketpro-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Ticket Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`:white_check_mark: Your Ticket has been created, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hey ${message.author.username}!`, message1)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticketpro-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

    message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`+confirm\`. This will time out in 10 seconds and be cancelled.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '+confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit(' Ticket close timed out, the Ticket channel was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

});

client.login(token);
