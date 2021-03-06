import { Message, TextChannel } from "discord.js";

export type Collector = {
    time: number;
    filter: (message: Message) => boolean;
    max: number;
    channel: TextChannel;
    message: Message;
  };

export type resetTimer = {
    time: number,
    idle: number
}

export type events = {
    event: "collect" | "end" | "dispose"
}