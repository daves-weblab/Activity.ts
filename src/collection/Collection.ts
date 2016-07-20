import {Iterable} from "./iterator/Iterable";
import {List} from "./list/List";

export interface Collection<T> extends Iterable {
    find(predicate:(element:T) => boolean) : T | null;

    where(predicate:(element:T) => boolean) : List<T>;
}