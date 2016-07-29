export namespace ArrayHelper {
    export function add<T>(elements:Array<T>, element:T) {
        elements.push(element);
    }

    export function remove<T>(elements:Array<T>, element:T, all:boolean = false) {
        let done = false;

        while (!done) {
            let index = elements.indexOf(element);

            if (index != -1) {
                ArrayHelper.removeByIndex(elements, index);

                done = !all;
            } else {
                done = true;
            }
        }
    }

    export function until<T>(elements:Array<T>, predicate:(element:T) => boolean):boolean {
        for(let i = 0; i < elements.length; i++) {
            if(!predicate(elements[i])) return false;
        }

        return true;
    }

    export function exists<T>(elements:Array<T>, element:T):boolean {
        for (let i = 0; i < elements.length; i++) {
            if (elements[i] == element) return true;
        }

        return false;
    }

    export function first<T>(elements:Array<T>):T {
        if (!elements.length) return null;

        return elements[0];
    }

    export function removeFirst<T>(elements:Array<T>) {
        return ArrayHelper.removeByIndex(elements, 0);
    }

    export function removeByIndex<T>(elements:Array<T>, index:number) {
        if (index >= elements.length) return elements;

        elements.splice(index, 1);
    }
}