import { InitialCollector } from "./InitialCollector";
import { Collector, resetTimer, events } from "../types/Collector";
import { Message, MessageCollector } from "discord.js";
export declare class messageCollector extends InitialCollector {
    collector: MessageCollector | null;
    constructor(Obj: Collector);
    start(): MessageCollector;
    stop(reason: string): void;
    on({ event }: events, callback: Function): void;
    resetTimer(Options: resetTimer): void;
    dispose(message: Message): void;
}
