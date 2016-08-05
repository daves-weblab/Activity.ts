import {ModelChangeEvent} from "./ModelChangeEvent";
import {EventDispatcherContainer} from "../app/event/EventDispatcherContainer";
import {Operator} from "./operator/Operator";
import {prototype} from "../util/annotations/Class";
import {extend} from "../util/object/Objects";
import {ModelService} from "./ModelService";
import {ModelOperator} from "./operator/ModelOperator";
import {first} from "../util/array/Arrays";
import {NoSuchOperatorException} from "./operator/NoSuchOperatorException";
import {isFunction} from "../util/general/General";
import {FunctionOperator} from "./operator/FunctionOperator";

const ATTRIBUTE_DEFINITION_FIELD = "__attributes_definition__";
const ID_ATTRIBUTE_FIELD = "__id_attribute__";

export function Attributes(attributes:Object) {
    return function (target:Function) {
        let attributesDefinition = {};

        extend(
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

    private _dispatcherContainer:EventDispatcherContainer<ModelChangeEvent> = new EventDispatcherContainer<ModelChangeEvent>();

    @prototype("id")
    __attributes_definition__;

    @prototype({})
    __id_attribute__;

    protected attributes:Object = {};

    constructor(attributes:Object = {}) {
        // todo check if attribute definition is an abstract model
        // --> create new one with passed data if data is not a model itself
        extend(this.attributes, this.getAttributeDefinition(), attributes);
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

        let root:Operator = new ModelOperator();

        root.setQualifier(first(partials));
        root.eval(this);
        
        let previous:Operator = root;
        let current:Operator = null;

        for (let i = 1; i < partials.length || isFunction(previous.getValue()); i++) {
            let partial:string = partials[i] || null;

            if (partial && this.isOperator(partial)) {
                // todo
            } else {
                current = ModelService.getOperatorFor(previous.getValue());
            }

            if(!current) throw new NoSuchOperatorException("operator for " + previous.getValue() + " could not be found, qualifier = " + partial);

            current.setQualifier(partial);
            current.setPrevious(previous);

            current.setQualifier(partial);

            if(!current.consumes()) i--;

            current.eval(previous.getValue());

            previous.setNext(current);
            previous = current;
        }

        return root.retrieve();
    }

    private isOperator(partial:string) {
        return partial.charAt(0) == AbstractModel.OPERATOR_KEY;
    }

    set() {

    }
}