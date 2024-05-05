// 参考 https://github.com/developit/mitt
export type EventType = string | symbol

// 事件处理器
export type Handler<T = any> = (event?: T) => void
export type WildcardHandler = (type: EventType, event?: any) => void

// 事件处理程序数组
export type EventHandlerList = Array<Handler>
export type WildCardEventHandlerList = Array<WildcardHandler>

// 事件类型 事件处理器 映射
export type EventHandlerMap = Map<EventType, EventHandlerList | WildCardEventHandlerList>

export interface Emitter {
  all: EventHandlerMap

  on: (<T = any>(type: EventType, handler: Handler<T>) => void)

  off: (<T = any>(type: EventType, handler?: Handler<T>) => void)

  emit: (<T = any>(type: EventType, event?: T) => void)

  clear: () => void
}

function _mitt(all?: EventHandlerMap): Emitter {
  all = all || new Map()
  return {
    // 事件名称到事件处理器的映射
    all,

    // 开启监听
    on<T = any>(type: EventType, handler: Handler<T>) {
      const handlers = all?.get(type)
      const added = handlers && handlers.push(handler)
      if (!added)
        all?.set(type, [handler])
    },

    // 关闭监听
    off<T = any>(type: EventType, handler?: Handler<T>) {
      if (!handler) {
        all?.delete(type)
      }
      else {
        const handlers = all?.get(type)
        if (handlers)
          handlers.splice(handlers.indexOf(handler) >>> 0, 1)
      }
    },

    // 发射
    emit<T = any>(type: EventType, evt: T) {
      ((all?.get(type) || []) as EventHandlerList).slice().map(handler =>
        handler(evt),
      );
      ((all?.get('*') || []) as WildCardEventHandlerList).slice().map(handler =>
        handler(type, evt),
      )
    },

    // 清除
    clear() {
      this.all.clear()
    },
  }
}

const mitt = _mitt()

const symbolRequestName = Symbol('requestName')
const symbolResponseName = Symbol('responseName')

export function requestNotify(options?: any, requestName: string | symbol = symbolRequestName, responseName: string | symbol = symbolResponseName) {
  mitt.off(requestName)
  mitt.on(requestName, () => {
    mitt.emit(responseName, options)
  })
}

export function responseNotify(
  callback: (options?: any) => void,
  requestName: string | symbol = symbolRequestName,
  responseName: string | symbol = symbolResponseName,
) {
  mitt.off(responseName)
  mitt.on(responseName, (options) => {
    callback(options)
  })
  mitt.emit(requestName)
}

export default mitt
