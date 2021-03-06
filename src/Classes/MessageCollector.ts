import { name } from "../../package.json";
// Classes
import { InitialCollector } from "./InitialCollector";

// Types
import { Collector, resetTimer, events } from "../types/Collector";
import { Message, MessageCollector } from "discord.js";

export class messageCollector extends InitialCollector {
  collector: MessageCollector | null;

  constructor(Obj: Collector) {
    if (typeof Obj === "object")
      throw new SyntaxError(
        `${name} -- Paramater of the MessageCollector class expected an object received ${typeof Obj}`
      );
    super(Obj);
    this.collector = null;
  }

  start() {
    const collector = super.channel.createMessageCollector(this.filter, {
      time: this.time,
      max: this.max,
    });
    this.collector = collector;
    return collector;
  }

  stop(reason: string) {
    if (!this.collector)
      throw new RangeError(`
    ${name} -- Couldn't find the current collector. Initialize a MessageCollector By using the \`start()\` Function.
    `);
    this.collector.stop(reason ? reason : `No reason specified.`);
  }

  on({ event }: events, callback: Function) {
    const events = ["end", "dispose", "collect"];
    if (!events.includes(event))
      throw new SyntaxError(
        `${name} -- On(event: string, collector: MessageCollector, callback: Function) Function paramatar "event" was expected to be 'end' | 'collect' | 'dispose' received ${event}`
      );

    if (!this.collector)
      throw new RangeError(`
    ${name} -- Couldn't find the current collector. Initialize a MessageCollector By using the \`start()\` Function.
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

  resetTimer(Options: resetTimer) {
    if (typeof Options !== "object" && Options)
      throw new SyntaxError(`
      ${name} -- resetTimer([options]) Function first paramater expected to be an object received ${typeof Options}
    `);

    if (!this.collector)
      throw new RangeError(`
    ${name} -- Couldn't find the current collector. Initialize a MessageCollector By using the \`start()\` Function.
    `);

    this.collector.resetTimer(Options);
  }

  dispose(message: Message) {
    if (!message)
      throw new SyntaxError(`
      ${name} -- dispose(message: Discord.Message) Expected to receive a paramater.
    `);

    if (!this.collector)
      throw new RangeError(`
      ${name} -- Couldn't find the current collector. Initialize a MessageCollector By using the \`start()\` Function.
    `);

    this.collector.dispose(message);
  }
}
