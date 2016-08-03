import {prototype} from "../util/annotations/Class";
import {ObjectHelper} from "../util/object/ObjectHelper";

export const ATTRIBUTE_DEFINITION_FIELD = "_attributes_definition_";

export class Attributable {
    @prototype({})
    ATTRIBUTE_DEFINITION_FIELD;
    
    protected attributes:Object = {};

    constructor(attributes:Object = {}) {
        ObjectHelper.extend(this.attributes, this.getAttributeDefinition(), attributes);
    }
    
    protected getAttributeDefinition() {
        return this[ATTRIBUTE_DEFINITION_FIELD];
    }
}