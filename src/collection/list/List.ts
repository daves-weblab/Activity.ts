import {Collection} from "../Collection";

export interface List<T> extends Collection<T> {
    removeByIndex(index:number);
 
    add(element:T);

    remove(element:T, all:boolean);
}