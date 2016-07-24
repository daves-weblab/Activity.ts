import {MapIterator} from "../iterator/map/MapIterator";
import {Entry} from "./Entry";
import {List} from "../list/List";

export interface Map<K, V> {
    put(key:K, value:V);

    get(key:K);

    has(key:K);

    remove(key:K);

    iterator():MapIterator<K, V>;

    findKey(elements:V):K;

    keySet():List<K>;

    valueSet():List<V>;

    forEach(iteration:(entry:Entry<K, V>) => void);

    size():number;
}