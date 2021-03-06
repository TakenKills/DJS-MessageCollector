import { Message } from "discord.js";
import { Collector } from '../types/Collector';
export declare class InitialCollector {
    message: Message;
    channel: import("discord.js").TextChannel | import("discord.js").DMChannel | import("discord.js").NewsChannel;
    max: number;
    time: number;
    filter: (message: Message) => boolean;
    constructor(Obj: Collector);
}
