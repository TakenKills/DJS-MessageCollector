import { Message, TextChannel } from "discord.js";
export declare type Collector = {
    time: number;
    filter: (message: Message) => boolean;
    max: number;
    channel: TextChannel;
    message: Message;
};
export declare type resetTimer = {
    time: number;
    idle: number;
};
export declare type events = {
    event: "collect" | "end" | "dispose";
};
