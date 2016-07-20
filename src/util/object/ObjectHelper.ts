export module ObjectHelper {
    export function forEach(object:Object, iteration:(key:string, value:any) => void) {
        for(let key in object) {
            if(object.hasOwnProperty(key)) {
                
            }
        }
    }
}