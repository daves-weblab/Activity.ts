import {EventDispatcher} from "../app/event/EventDispatcher";
import {ModelChangeEvent} from "./ModelChangeEvent";
import {EventDispatcherContainer} from "../app/event/EventDispatcherContainer";
import {Computed} from "./attributes/Computed";
import * as General from "../util/general/General";

export abstract class AbstractModel {
    private dispatcherContainer:EventDispatcherContainer<ModelChangeEvent> = new EventDispatcherContainer<ModelChangeEvent>();

    get(key:string) {
        return this.evaluateGet(key);
    }

    set(key:string, value:any) {

    }

    private evaluateGet(key:string) {
        if (!this.hasAttribute(key)) return null;

        if (this[key] instanceof Computed) {
            let computed:Computed = this[key];
            return computed.get(this);
        }

        return this[key];
    }

    private hasAttribute(key:string):boolean {
        if (!General.isFunction(this[key])) return true;

        if (this[key] instanceof Computed) return true;

        return false;
    }

    getObserverFor(key:string):EventDispatcher<ModelChangeEvent> {
        if (this.hasAttribute(key)) {
            return this.dispatcherContainer.ensureDispatcher(key);
        }

        return null;
    }
}