import {ModelChangeEvent} from "./ModelChangeEvent";
import {EventDispatcherContainer} from "../app/event/EventDispatcherContainer";
import {StringMap} from "../collection/map/StringMap";
import {Operator} from "./operator/Operator";
import {FunctionOperator} from "./operator/FunctionOperator";
import {ValueOperator} from "./operator/ValueOperator";
import {RootOperator} from "./operator/RootOperator";
import {prototype} from "../util/annotations/Class";
import {ObjectHelper} from "../util/object/ObjectHelper";
import {ModelService} from "./ModelService";

const ATTRIBUTE_DEFINITION_FIELD = "__attributes_definition__";
const ID_ATTRIBUTE_FIELD = "__id_attribute__";

export function Attributes(attributes:Object) {
    return function (target:Function) {
        let attributesDefinition = {};

        ObjectHelper.extend(
            attributesDefinition,
            target.prototype[ATTRIBUTE_DEFINITION_FIELD] || {},
            attributes
        );

        target.prototype[ATTRIBUTE_DEFINITION_FIELD] = attributesDefinition;
    }
}

export function IdAttribute(name:string|Array<string>) {
    return function (target:Function) {
        target.prototype[ID_ATTRIBUTE_FIELD] = name;
    }
}

export abstract class AbstractModel {
    private static OPERATOR_KEY:string = '@';
    private static FUNCTION_REGEX:RegExp = /[a-zA-Z0-9_]+\(\)/;
    private static PERENTHESIS_REGEX:RegExp = /\(|\)/gi;

    private _dispatcherContainer:EventDispatcherContainer<ModelChangeEvent> = new EventDispatcherContainer<ModelChangeEvent>();

    @prototype("id")
    ID_ATTRIBUTE_FIELD;

    @prototype({})
    ATTRIBUTE_DEFINITION_FIELD;

    protected attributes:Object = {};

    constructor(attributes:Object = {}) {
        ObjectHelper.extend(this.attributes, this.getAttributeDefinition(), attributes);
    }

    protected getIdAttribute():string|Array<string> {
        return this[ID_ATTRIBUTE_FIELD];
    }

    protected getAttributeDefinition():Object {
        return this[ATTRIBUTE_DEFINITION_FIELD];
    }

    getAttributes():Object {
        return this.attributes;
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
}