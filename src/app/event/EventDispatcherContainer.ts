import {StringMap} from "../../collection/map/StringMap";
import {EventDispatcher} from "./EventDispatcher";
import {NullPointerException} from "../../exceptions/NullPointerException";

export class EventDispatcherContainer<Handler extends Function> {
    private dispatchers:StringMap<EventDispatcher<Handler>> = new StringMap<EventDispatcher<Handler>>();

    constructor(dispatcherNames:string[]) {
        dispatcherNames.forEach((name:string) => {
            this.dispatchers.put(name, new EventDispatcher<Handler>());
        });
    }

    getDispatcher(name:string):EventDispatcher<Handler> {
        if(!this.dispatchers.has(name)) throw new NullPointerException();

        return this.dispatchers.get(name);
    }

    removeDispatcher(name:string) {
        this.dispatchers.remove(name);
    }

    destroy() {
        this.dispatchers.clear();
    }
}