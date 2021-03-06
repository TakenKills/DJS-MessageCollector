"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialCollector = void 0;
const package_json_1 = require("../../package.json");
const defaults = {
    max: 1,
    time: 60000,
};
class InitialCollector {
    constructor(Obj) {
        if (typeof Obj !== "object")
            throw new Error(`${package_json_1.name} -- In the InitialCollector class expected an object recieved ${typeof Obj}`);
        this.message = Obj.message;
        this.channel = Obj.message
            ? Obj.channel
                ? Obj.channel
                : Obj.message.channel
            : Obj.channel;
        this.max = Obj.max ? Obj.max : defaults.max;
        this.time = Obj.time ? Obj.time : defaults.time;
        this.filter = Obj.filter
            ? Obj.filter
            : (m) => m.author.id === this.message.author.id;
    }
}
exports.InitialCollector = InitialCollector;
