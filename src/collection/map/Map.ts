import {MapIterator} from "../iterator/map/MapIterator";

export interface Map<K, V> {
    put(key:K, value:V);

    get(key:K);

    has(key:K);

    iterator():MapIterator<K, V>;

    find(element:V);
}