import {Collection} from "../Collection";

export interface List<T> extends Collection<T> {
    add(element:T);

    get(index:number):T;

    remove(element:T, all?:boolean);

    removeAll(elements:List<T>);

    removeByIndex(index:number);
}