import {ModelChangeEvent} from "./ModelChangeEvent";
import {EventDispatcherContainer} from "../app/event/EventDispatcherContainer";
import {GetSetable} from "../util/object/GetSetable";
import {StringMap} from "../collection/map/StringMap";
import {Operator} from "./operator/Operator";
import {List} from "../collection/list/List";
import {ArrayList} from "../collection/list/ArrayList";
import {FunctionOperator} from "./operator/FunctionOperator";

export abstract class AbstractModel {
    private static OPERATOR_KEY:string = '@';
    
    private dispatcherContainer:EventDispatcherContainer<ModelChangeEvent> = new EventDispatcherContainer<ModelChangeEvent>();

    protected attributes:{} = {};

    protected idAttribute:string = null;
    protected idAttributes:string[] = null;
    
    get(key:string) {
        let partials = key.split('.');
        
        if(!partials.length) return null;

        // todo replace with stack
        let operatorChain:List<Operator> = new ArrayList<Operator>();
        
        
    }

    private isOperator(partial:string) {
        return partial.charAt(0) == AbstractModel.OPERATOR_KEY;
    }
    
    set() {
        
    }
    
    private static __operators__:StringMap<Operator> = new StringMap<Operator>();

    public static registerOperator(name:string, operator:Operator) {
        this.__operators__.put(name, operator);
    }

    public static unregisterOperator(name:string) {
        this.__operators__.remove(name);
    }
}

AbstractModel.registerOperator('value', new ValueOperator());
AbstractModel.registerOperator('function', new FunctionOperator());