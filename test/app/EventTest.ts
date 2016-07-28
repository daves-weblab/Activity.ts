import * as tsUnit from "../tsUnit/tsUnit";
import {EventDispatcher} from "../../src/app/event/EventDispatcher";

interface CustomEventHandler {
    ():void;
}

export class EventTest extends tsUnit.TestClass {
    subscribeDispatchTest() {
        let dispatcher:EventDispatcher<CustomEventHandler> = new EventDispatcher<CustomEventHandler>();

        let count = 0;

        dispatcher.subscribe("test1", () => {
           count++;
        });

        dispatcher.subscribe("test1", () => {
            count++;
        });

        dispatcher.subscribe("test2", () => {
            count++;
        });

        var fail = () => {
            this.fail("Fail callback was not removed!");
        };

        dispatcher.subscribe("test2", fail);
        dispatcher.unsubscribe("test2", fail);
        
        this.areIdentical(0, count);
        dispatcher.dispatch();
        this.areIdentical(3, count);

        dispatcher.unsubscribe("test1");

        dispatcher.dispatch();
        this.areIdentical(4, count);
    }
}