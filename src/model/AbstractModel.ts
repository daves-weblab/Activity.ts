import {ModelChangeEvent} from "./ModelChangeEvent";
import {EventDispatcherContainer} from "../app/event/EventDispatcherContainer";
import {StringMap} from "../collection/map/StringMap";
import {Operator} from "./operator/Operator";
import {FunctionOperator} from "./operator/FunctionOperator";
import {ValueOperator} from "./operator/ValueOperator";
import {RootOperator} from "./operator/RootOperator";
import {ObjectHelper} from "../util/object/ObjectHelper";

export class AbstractModel {
    private static OPERATOR_KEY:string = '@';
    private static FUNCTION_REGEX:RegExp = /[a-zA-Z0-9_]+\(\)/;
    private static PERENTHESIS_REGEX:RegExp = /\(|\)/gi;

    private _dispatcherContainer:EventDispatcherContainer<ModelChangeEvent> = new EventDispatcherContainer<ModelChangeEvent>();

    protected attributes:{} = {};

    protected idAttribute:string = null;
    protected idAttributes:string[] = null;

    static create(attributes:Object) {
        let model:AbstractModel = new this();
        model.extendAttributes(attributes);
        return model;
    }

    private extendAttributes(attributes:Object) {
        ObjectHelper.extendStrict(this.attributes, attributes);
    }

    get(key:string) {
        let partials = key.split('.');

        if (!partials.length) return null;

        let root:Operator = new RootOperator();
        let previous:Operator = root;
        let current:Operator = null;

        root.setData(this.attributes);

        for (let i = 0; i < partials.length; i++) {
            let partial:string = partials[i];

            if (this.isOperator(partial)) {
                // todo
            } else if (this.isFunction(partial)) {
                partial = this.stripFunctionParenthesis(partial);
                current = new FunctionOperator();
            } else {
                current = new ValueOperator();
            }

            current.setQualifier(partial);
            current.setPrevious(previous);

            if (previous instanceof Operator) {
                previous.setNext(current);
            }

            previous.setNext(current);
            current.setPrevious(previous);

            previous = current;
        }

        return root.evaluate();
    }

    private isOperator(partial:string) {
        return partial.charAt(0) == AbstractModel.OPERATOR_KEY;
    }

    private isFunction(partial:string) {
        return partial.match(AbstractModel.FUNCTION_REGEX);
    }

    private stripFunctionParenthesis(partial:string) {
        return partial.replace(AbstractModel.PERENTHESIS_REGEX, '');
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