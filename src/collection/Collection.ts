import {Iterable} from "./iterator/Iterable";
import {List} from "./list/List";

export interface Collection<T> extends Iterable<T> {
    find(predicate:(element:T) => boolean):T;

    where(predicate:(element:T) => boolean):List<T>;

    forEach(iteration:(element:T) => any);

    map(operator:(element:T) => T):Collection<T>;

    size():number;
    
    clear();
}