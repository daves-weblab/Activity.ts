export namespace ObjectHelper {
    export function forEach(object:Object, iteration:(key:any, value:any) => void) {
        let key:string;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                iteration(key, object[key]);
            }
        }
    }

    export function applyTraits(derivedCtor:any, baseCtors:any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }

    export function isObject(obj:any) {
        if(obj == null) return false;

        return typeof obj === 'object';
    }

    export function extend(target:Object, ...sources:Object[]) {
        let tmp:Object = {};

        for(let i = 0; i < sources.length; i++) {
            extendSingle(tmp, sources[i]);
        }

        extendSingle(target, tmp);
    }

    function extendSingle(target:Object, source:Object) {
        ObjectHelper.forEach(source, (key:any, value:any) => {
            if(isObject(target[key]) && isObject(value)) {
                extend(target[key], value);
            } else {
                target[key] = value;
            }
        });
    }
}