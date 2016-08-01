import * as General from "../../util/general/General";
import {AbstractModel} from "../Model";

export interface ComputedOptions {
    dependencies?:string[];
    computed;
}

export class Computed {
    private getter:Function = null;
    private setter:Function = null;

    constructor(options:ComputedOptions) {
        if (options.computed) {
            this.setDependencies(options.dependencies);
        }

        if (General.isFunction(options.computed)) {
            this.setGetter(options.computed);
        } else {
            this.setGetter(options.computed.get);
            this.setSetter(options.computed.set);
        }
    }

    setDependencies(dependencies:string[]) {
        // todo
    }

    setGetter(getter) {
        this.getter = getter;
    }

    setSetter(setter) {
        this.setter = setter;
    }

    get(context:AbstractModel) {
        if (this.getter) {
            return this.getter.call(context);
        }
    }

    set(context:AbstractModel, value:any) {
        if (this.setter) {
            this.setter.call(context, value);
        }
    }
}