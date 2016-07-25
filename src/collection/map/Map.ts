import {Entry} from "./Entry";
import {List} from "../list/List";
import {Iterator} from "../iterator/Iterator";

export interface Map<K, V> {
    put(key:K, value:V);

    get(key:K);

    has(key:K);

    remove(key:K);

    iterator():Iterator<Entry<K, V>>;

    findKey(element:V):K;

    keySet():List<K>;

    valueSet():List<V>;

    forEach(iteration:(entry:Entry<K, V>) => void);

    size():number;
}