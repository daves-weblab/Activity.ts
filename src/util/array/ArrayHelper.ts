export namespace ArrayHelper {
    export function add<T>(elements:Array<T>, element:T) {
        elements.push(element);
    }

    export function remove<T>(elements:Array<T>, element:T, all:boolean = false):Array<T> {
        let done = false;

        while(!done) {
            let index = elements.indexOf(element);

            if(index != -1) {
                elements = ArrayHelper.removeByIndex(elements, index);

                done = !all;
            } else {
                done = true;
            }
        }

        return elements;
    }

    export function first<T>(elements:Array<T>):T {
        if(!elements.length) return null;

        return elements[0];
    }

    export function removeFirst<T>(elements:Array<T>) {
        return ArrayHelper.removeByIndex(elements, 0);
    }

    export function removeByIndex<T>(elements:Array<T>, index:number):Array<T> {
        if(index >= elements.length) return elements;

        return elements.splice(index, 1);
    }
}