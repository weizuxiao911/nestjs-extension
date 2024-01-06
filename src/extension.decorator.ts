import { Injectable } from '@nestjs/common'
import { WebSocketGateway } from "@nestjs/websockets"
import { ExtensionWebSocket } from './extension.websocket'
import { ExtensionRedis } from './extension.redis'

/**  实现类 */
export const Implements = (primary: any): ClassDecorator => {
  return (target) => {
    Object.setPrototypeOf(target.prototype, primary?.prototype)
    return Injectable()(target)
  }
}

/** 消费者 */
export const Consumer = (subscriber?: any): ClassDecorator => {
  return (target) => {
    Object.setPrototypeOf(target.prototype, (subscriber ?? ExtensionRedis)?.prototype)
    return Injectable()(target)
  }
}

/** websocket */
export const WebsocketHandle = (path?: string): ClassDecorator => {
  return (target: any) => {
    Object.setPrototypeOf(target.prototype, ExtensionWebSocket.prototype)
    if (!target?.prototype?.path) {
      target.prototype.path = path
    }
    return WebSocketGateway({ path: path ?? '' })(target)
  };
};

/** 订阅方法 */
export const Subscribe = (event: 'connect' | 'message' | 'close' | 'error' | any): MethodDecorator => {
  return (target: any, property: string) => {
    if (!target?.metadata) {
      target.metadata = {}
    }
    if (!target?.metadata[event]) {
      target.metadata[event] = property
    }
    Reflect.defineMetadata(event, true, target, property)
  }
}
