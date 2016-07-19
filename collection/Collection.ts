import {Iterable} from "./iterator/Iterable";

export interface Collection<T> extends Iterable {
    add(element:T);

    remove(element:T, all:boolean = false);

    removeByIndex(index:number);
}