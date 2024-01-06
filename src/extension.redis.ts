import { Logger, OnModuleInit } from "@nestjs/common";
import Redis from "ioredis";

/** 抽象redis subscribe */
export abstract class ExtensionRedis implements OnModuleInit {

    private client: Redis;

    onModuleInit() {
        const logger = new Logger(this?.constructor?.name)
        if (!this.client) {
            logger.error('must config redis in constructor')
            return 
        }
        const metadata = this['metadata']
        const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(this))
        logger.log(`Subscribe on [${Object.keys(metadata)}]`)
        this.client.subscribe(...Object.keys(metadata))
        this.client.on('message', (ch, message) => {
            const fs = methods.filter(f => Reflect.getMetadata(ch, this, f) && Object.prototype.toString.call(f))
            fs.length && this[fs[0]](message)
        })
    }

}