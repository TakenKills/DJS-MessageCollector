"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCollector = void 0;
const package_json_1 = require("../../package.json");
const InitialCollector_1 = require("./InitialCollector");
class messageCollector extends InitialCollector_1.InitialCollector {
    constructor(Obj) {
        if (typeof Obj !== "object")
            throw new SyntaxError(`${package_json_1.name} -- Paramater of the MessageCollector class expected an object received ${typeof Obj}`);
        super(Obj);
        this.collector = null;
    }
    start() {
        const collector = this.channel.createMessageCollector(this.filter, {
            time: this.time,
            max: this.max,
        });
        this.collector = collector;
        return collector;
    }
    stop(reason) {
        if (!this.collector)
            throw new RangeError(`
    ${package_json_1.name} -- Couldn't find the current collector. Initialize a MessageCollector By using the \`start()\` Function.
    `);
        this.collector.stop(reason ? reason : `No reason specified.`);
    }
    on(event, callback) {
        const events = ["end", "dispose", "collect"];
        if (!events.includes(event))
            throw new SyntaxError(`${package_json_1.name} -- On(event: string, callback: Function) Function paramatar "event" was expected to be 'end' | 'collect' | 'dispose' received ${event}`);
        if (!this.collector)
            throw new RangeError(`
    ${package_json_1.name} -- Couldn't find the current collector. Initialize a MessageCollector By using the \`start()\` Function.
    `);
        const collector = this.collector;
        switch (event) {
            case "end":
                collector.on("end", (collected, reason) => {
                    callback(collected, reason);
                });
                break;
            case "collect":
                collector.on("collect", (message) => {
                    callback(message);
                });
                break;
            case "dispose":
                collector.on("dispose", (message) => {
                    callback(message);
                });
                break;
        }
    }
    resetTimer(Options) {
        if (typeof Options !== "object" && Options)
            throw new SyntaxError(`
      ${package_json_1.name} -- resetTimer([options]) Function first paramater expected to be an object received ${typeof Options}
    `);
        if (!this.collector)
            throw new RangeError(`
    ${package_json_1.name} -- Couldn't find the current collector. Initialize a MessageCollector By using the \`start()\` Function.
    `);
        this.collector.resetTimer(Options);
    }
    dispose(message) {
        if (!message)
            throw new SyntaxError(`
      ${package_json_1.name} -- dispose(message: Discord.Message) Expected to receive a paramater.
    `);
        if (!this.collector)
            throw new RangeError(`
      ${package_json_1.name} -- Couldn't find the current collector. Initialize a MessageCollector By using the \`start()\` Function.
    `);
        this.collector.dispose(message);
    }
}
exports.messageCollector = messageCollector;
