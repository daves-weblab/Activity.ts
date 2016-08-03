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

    export function extendStrict(target:Object, source:Object) {
        // todo make this recursive if both values are an object!
        ObjectHelper.forEach(source, (sourceKey:any, value:any) => {
            ObjectHelper.forEach(target, (targetKey:any) => {
                if(sourceKey == targetKey) {
                    target[targetKey] = value;
                }
            });
        });
    }
}