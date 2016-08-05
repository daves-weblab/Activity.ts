import {StringMap} from "../collection/map/StringMap";
import {Operator} from "./operator/Operator";
import {List} from "../collection/list/List";
import {Operatable} from "./operator/Operatable";
import {ArrayList} from "../collection/list/ArrayList";
import {ValueOperator} from "./operator/ValueOperator";
import {FunctionOperator} from "./operator/FunctionOperator";
import {AbstractModel} from "./AbstractModel";
import {isFunction} from "../util/general/General";
import {isObject} from "../util/object/Objects";
import {ModelOperator} from "./operator/ModelOperator";

interface OperatorMapping {
    target:{new():Operator};
    operatable:Operatable;
}

var operators:StringMap<{new():Operator}> = new StringMap<{new():Operator}>();
var operatorMapping:List<OperatorMapping> = new ArrayList<OperatorMapping>();

export let ModelService = {
    getOperator(name:string):Operator {
        return operators.get(name);
    },

    registerOperator(name:string, operator:{new():Operator}) {
        operators.put(name, operator);
    },

    getOperatorFor(value:any):Operator {
        let mapping = operatorMapping.find((mapping:OperatorMapping) => {
            return mapping.operatable(value);
        });

        if(mapping) {
            return new mapping.target();
        }

        return null;
    },

    mapOperator(target:{new():Operator}, operatable:Operatable) {
        operatorMapping.add({
            target: target,
            operatable: operatable
        });
    }
};

ModelService.mapOperator(ValueOperator, (value:any) => {
    if(value instanceof AbstractModel) return false;

    return typeof value == 'number' || typeof value == 'string' || typeof value == 'boolean' || isObject(value);
});

ModelService.mapOperator(FunctionOperator, (value:any) => {
    return isFunction(value);
});

ModelService.mapOperator(ModelOperator, (value:any) => {
    return value instanceof AbstractModel;
});