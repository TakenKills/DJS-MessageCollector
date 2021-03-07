import { InitialCollector } from "./InitialCollector";
import { Collector, resetTimer } from "../types/Collector";
import { Message, MessageCollector } from "discord.js";
export declare class messageCollector extends InitialCollector {
    collector: MessageCollector | null;
    constructor(Obj: Collector);
    start(): MessageCollector;
    stop(reason: string): void;
    on(event: string, callback: Function): void;
    resetTimer(Options: resetTimer): void;
    dispose(message: Message): void;
}
