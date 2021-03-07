import { name } from "../../package.json";
import { Message } from "discord.js";
import { Collector } from '../types/Collector'

const defaults = {
  max: 1,
  time: 60000,
};

export class InitialCollector {
  message;
  channel;
  max;
  time;
  filter: (message: Message) => boolean;
  constructor(Obj: Collector) {
    if (typeof Obj !== "object")
      throw new Error(
        `${name} -- In the InitialCollector class expected an object recieved ${typeof Obj}`
      );

    this.message = Obj.message;
    this.channel = Obj.message ? Obj.message.channel : Obj.channel
    this.max = Obj.max ? Obj.max : defaults.max;
    this.time = Obj.time ? Obj.time : defaults.time;
    this.filter = Obj.filter
      ? Obj.filter
      : (m: Message) => m.author.id === this.message.author.id;
  }
}
