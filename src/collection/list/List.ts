import {Collection} from "../Collection";

export interface List<T> extends Collection<T> {
    add(element:T);

    remove(element:T, all:boolean);

    removeByIndex(index:number);
}