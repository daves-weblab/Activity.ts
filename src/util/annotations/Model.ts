import {ObjectHelper} from "../object/ObjectHelper";
import {ATTRIBUTE_DEFINITION_FIELD} from "../../model/Attributable";

export function Attributes(attributes:Object) {
    return function(target:Function) {
        var attributesDefintion = {};
        
        ObjectHelper.extend(attributesDefintion, target.prototype[ATTRIBUTE_DEFINITION_FIELD], attributes);
        target.prototype[ATTRIBUTE_DEFINITION_FIELD] = attributesDefintion;
    }
}

function IdAttribute() {
}

function idAttributes() {}