# nestjs-extension

## 简介

`nestjs-extension`是基于`nestjs`框架进行增强的拓展，新增`@Consumer(subscriber)`、`@WebsocketHandle(path)`、`@Implements(primary)`等类装配器和`@Subscribe(pattern)`方法装配器。

## 使用

### `@Consumer(subscriber)`和`@Subscribe(pattern)`

`@Consumer(subscriber)`用于申明一个类是一个消费者，默认subscriber是redis，用于生产/消费模式的实现。需结合`@Subscribe(pattern)`使用