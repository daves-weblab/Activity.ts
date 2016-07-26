import {StringMap} from "../collection/map/StringMap";
import {List} from "../collection/list/List";
import {ArrayList} from "../collection/list/ArrayList";

interface Subscribable<T> {
    subscribe(domain:string, handler:T):void;
    unsubscribe(domain:string, handler:T):void;
}

interface Emitter<E, A> extends Subscribable<EmitterHandler<E, A>> {
}

interface Event<A> extends Subscribable<EventHandler<A>> {
}

interface Signal extends Subscribable<SignalHandler> {
}

interface EmitterHandler<E, A> {
    (emitter:E, args:A);
}

interface EventHandler<A> {
    (args:A);
}

interface SignalHandler {
    ();
}

class DispatcherWrapper<T> implements Subscribable<T> {
    constructor(private dispatcher:Subscribable<T>) {
    }

    subscribe(domain:string, handler:T) {
        this.dispatcher.subscribe(domain, handler);
    }

    unsubscribe(domain:string, handler:T = null) {
        this.dispatcher.unsubscribe(domain, handler);
    }
}

abstract class AbstractEventDispatcher<T> implements Subscribable<T> {
    private wrapper:Subscribable<T> = new DispatcherWrapper<T>(this);
    protected handlers:StringMap<List<T>> = new StringMap<List<T>>();

    private ensureHandlers(domain:string):List<T> {
        if (!this.handlers.has(domain)) {
            this.handlers.put(domain, new ArrayList<T>());
        }

        return this.handlers.get(domain);
    }

    subscribe(domain:string, handler:T) {
        if (handler) {
            this.ensureHandlers(domain).add(handler);
        }
    }

    unsubscribe(domain:string, handler:T = null) {
        if (handler) {
            this.ensureHandlers(domain).remove(handler);
        } else {
            this.handlers.remove(domain);
        }
    }

    event() {
        return this.wrapper;
    }
}

class EmitterDispatcher<E, A> extends AbstractEventDispatcher<EmitterHandler<E, A>> implements Emitter<E, A> {
    dispatch(emitter:E, args:A) {
        this.doDispatch(this.defaultDispatch, emitter, args);
    }

    dispatchAsync(emitter:E, args:A) {
        this.doDispatch(this.asyncDispatch, emitter, args);
    }

    private doDispatch(dispatch:(handler:EmitterHandler<E, A>, emitter:E, args:A) => void, emitter:E, args:A) {
        this.handlers.valueSet().forEach((handlers:List<EmitterHandler<E, A>>) => {
            handlers.forEach((handler:EmitterHandler<E, A>) => {
                handler(emitter, args);
            });
        });
    }

    private defaultDispatch(handler:EmitterHandler<E, A>, emitter:E, args:A) {
        handler(emitter, args);
    }

    private asyncDispatch(handler:EmitterHandler<E, A>, emitter:E, args:A) {
        setTimeout(() => {
            handler(emitter, args);
        }, 0);
    }
}

class EventDispatcher<A> extends AbstractEventDispatcher<EventHandler<A>> implements Event<A> {
    dispatch(args:A) {
        this.doDispatch(this.defaultDispatch, args);
    }

    dispatchAsync(args:A) {
        this.doDispatch(this.asyncDispatch, args);
    }

    private doDispatch(dispatch:(handler:EventHandler<A>, args:A) => void, args:A) {
        this.handlers.valueSet().forEach((handlers:List<EventHandler<A>>) => {
            handlers.forEach((handler:EventHandler<A>) => {
                handler(args);
            });
        });
    }

    private defaultDispatch(handler:EventHandler<A>, args:A) {
        handler(args);
    }

    private asyncDispatch(handler:EventHandler<A>, args:A) {
        setTimeout(() => {
            handler(args);
        }, 0);
    }
}

class SignalDispatcher extends AbstractEventDispatcher<SignalHandler> implements Signal {
    dispatch() {
        this.doDispatch(this.defaultDispatch);
    }

    dispatchAsync() {
        this.doDispatch(this.asyncDispatch);
    }

    private doDispatch(dispatch:(handler:SignalHandler) => void) {
        this.handlers.valueSet().forEach((handlers:List<SignalHandler>) => {
            handlers.forEach((handler:SignalHandler) => {
                handler();
            });
        });
    }

    private defaultDispatch(handler:SignalHandler) {
        handler();
    }

    private asyncDispatch(handler:SignalHandler) {
        setTimeout(() => {
            handler();
        }, 0);
    }
}

