import {ModelChangeEvent} from "./ModelChangeEvent";
import {EventDispatcherContainer} from "../app/event/EventDispatcherContainer";
import {StringMap} from "../collection/map/StringMap";
import {Operator} from "./operator/Operator";
import {FunctionOperator} from "./operator/FunctionOperator";
import {Stack} from "../collection/queue/Stack";
import * as General from "../util/general/General";
import {ValueOperator} from "./operator/ValueOperator";

export abstract class AbstractModel {
    private static OPERATOR_KEY:string = '@';

    private dispatcherContainer:EventDispatcherContainer<ModelChangeEvent> = new EventDispatcherContainer<ModelChangeEvent>();

    protected attributes:{} = {};

    protected idAttribute:string = null;
    protected idAttributes:string[] = null;

    get(key:string) {
        let partials = key.split('.');

        if (!partials.length) return null;

        let root:Operator = null;
        let previous:Operator = null;
        let current:Operator = null;

        for (let i = 0; i < partials.length; i++) {
            let partial:string = partials[i];

            if (this.isOperator(partial)) {
                // todo
            } else if (General.isFunction(partial)) {
                // todo
            } else {
                if(root == null) {
                    current = new RootOperator()
                } else {
                    current = new ValueOperator();
                }
            }

            current.setQualifier(partial);
            current.setPrevious(previous);

            if(previous instanceof Operator) {
                previous.setNext(current);
            }

            if (root == null) {
                root = current;
            }

            previous = current;
        }
    }

    private isOperator(partial:string) {
        return partial.charAt(0) == AbstractModel.OPERATOR_KEY;
    }

    set() {

    }

    private static __operators__:StringMap<{new():Operator}> = new StringMap<{new():Operator}>();

    public static registerOperator(name:string, operator:{new():Operator}) {
        this.__operators__.put(name, operator);
    }

    public static unregisterOperator(name:string) {
        this.__operators__.remove(name);
    }
}

AbstractModel.registerOperator('value', new ValueOperator());
AbstractModel.registerOperator('function', new FunctionOperator());