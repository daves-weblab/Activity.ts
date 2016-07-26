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
}