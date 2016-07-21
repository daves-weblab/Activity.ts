export namespace ObjectHelper {
    export function forEach(object:Object, iteration:(key:string, value:any) => void) {
        let key:string;
        for(key in object) {
            if(object.hasOwnProperty(key)) {
                iteration(key, object[key]);
            }
        }
    }
}