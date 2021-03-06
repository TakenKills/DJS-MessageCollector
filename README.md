### What is this?
This is a npm package that is made for the sole purpose of simplifying Message Collectors for you! Message Collectors are what you use to collect message in discord.js

### installation
`npm i djs-messagecollector`
Or
`yarn add djs-messagecollector`

## How to use
```javascript
const MessageCollector = require('djs-messagecollector');

// then you create a new MessageCollector Class <There are default values.>
const collector = new MessageCollector({ message: Discord.Message }) // read more about the paramaters of this class below. this is using all of the default values.

// start your collector
const collect = collector.start();

collector.on('collect', message => { // The message that was collected.
    console.log(message.content) // logging the message content...
})

collector.on('end', (collected, reason) => { // collected => the collected message, reason => the reason for the collectors end.
    console.log(collected);
})

collector.on('dispose', message => { // The message that was disposed of.
    console.log(message)
})

collector.resetTimer({ time: 60000, idle: 10000}) // resets the collectors timer read more on the [discord.js guid](https://discord.js.org/#/docs/main/master/class/MessageCollector?scrollTo=resetTimer)

collector.end() // ends the collecter and emits the 'end' event

collector.dispose(Discord.Message) // Disposes of a message and emits the 'dispose' event.
```

    
## Paramaters
MessageCollector Class
 - **Object**
    - **message**: `Discord.Message`
    - **channel**: `Discord.TextChannel | Discord.TextChannel`
    - **max** : number, "The max messages to be collected" DEFAULT OF 1
    - **time** : number, "The set time as were the collector would end." DEFAULT OF 60000
    - **filter**: Function, "The Message Collector filter." DEFAULT OF (m) => m.author.id === message.author.id; 