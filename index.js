const Discord = require('discord.js');
const bot = new Discord.Client();
const weather = require('weather-js');

bot.on('ready',()=> {
    console.log('weather can be read!')
    bot.user.setActivity('the weather', {type: 'WATCHING'}).catch(console.error);
    welcome(bot);
});

bot.on("message", async message => {
    const mesge = message.content.split(' ');
if(message.content.startsWith('?weather')) {
    weather.find({search: mesge[1], degreeType: 'C'}, function(err, result) {
        console.log(JSON.stringify(result, null, 2));
        if(err) return message.channel.send(err);
        if(!mesge[1]) {
        return message.channel.send("Please give the weather location")
        }
        if(result === undefined || result.length === 0) return message.channel.send('**INVALID** Location');

        let current = result[0].current;
        let location = result[0].location;

        const weatherInfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(0xFF0000)
        .addField(`Timezone: `, `UTC${location.timezone}`, true)
        .addField('Degree Type: ', 'Celsius', true)
        .addField('temperature: ', `${current.temperature}°C`, true)
        .addField('Wind: ', current.winddisplay, true)
        .addField('Feels like: ', `${current.feelslike}°`, true)
        .addField('Humifity: ', `${current.humidity}%`, true);
        message.channel.send(weatherInfo);
    });
}

});        

bot.login(process.env.TOKEN);