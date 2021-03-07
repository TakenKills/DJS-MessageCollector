const { Client } = require('discord.js');
const client = new Client();
const MessageCollector = require('../index');

client.on('message', message => {
    if (message.content === 'test') {
        const collector = new MessageCollector({ message: message, max: 10 });
        collector.start();

        collector.on('collect', message => {
            if (message.content === '3') collector.stop(`idk why`)
        })

        collector.on('end', (collected, reason) => {
            console.log(collected.first().content);
            console.log(reason)
        })

    }
})
    .on('ready', () => {
        console.log('Good to go and ready to mingle.')
    })

client.login('hehe boi you tried')