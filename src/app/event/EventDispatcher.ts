import {StringMap} from "../../collection/map/StringMap";
import {List} from "../../collection/list/List";
import {ArrayList} from "../../collection/list/ArrayList";
import {Entry} from "../../collection/map/Entry";
import {Subscribable} from "./Subscribable";

interface EventHandler<Handler> {
    callback:Handler,
    context:any
}

export class EventDispatcher<Handler extends Function> implements Subscribable<Handler> {
    private handlers:StringMap<List<EventHandler<Handler>>> = new StringMap<List<EventHandler<Handler>>>();

    private ensureHandlers(domain:any):List<EventHandler<Handler>> {
        if (!this.handlers.has(domain)) {
            this.handlers.put(domain, new ArrayList<EventHandler<Handler>>());
        }

        return this.handlers.get(domain);
    }

    subscribe(domain:any, handler:Handler, context:any = null) {
        if (handler) {
            this.ensureHandlers(domain).add({
                callback: handler,
                context: context
            });
        }
    }

    unsubscribe(domain:any, handler:Handler = null, context:any = null) {
        if (!handler) {
            this.handlers.remove(domain);
            return
        }

        let handlers = this.ensureHandlers(domain);

        let toRemove:List<EventHandler<Handler>> = handlers.where((h:EventHandler<Handler>) => {
            let isHandler:boolean = h.callback == handler;

            // only handler passed? ignore checking context
            if(!context) return isHandler;

            // context passed? check it as well
            return isHandler && context == h.context;
        });

        handlers.removeAll(toRemove);
    }

    dispatch(...args:any[]) {
        this.handlers.forEach((entry:Entry<any, List<EventHandler<Handler>>>) => {
            entry.getValue().forEach((handler:EventHandler<Handler>) => {
                handler.callback.apply(handler.context, args);
            });
        });
    }
    
    destroy() {
        this.handlers.clear();
    }
}