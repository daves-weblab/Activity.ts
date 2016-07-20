import {Iterator} from "../Iterator";
import {Entry} from "../../map/Entry";
import {List} from "../../list/List";

export class MapIterator<K, V> implements Iterator<Entry<K, V>> {
    constructor(private elements:List<Entry<K, V>>) {}

    hasNext():boolean {
        return undefined;
    }

    next():Entry<K, V> {
        return undefined;
    }
    remove() {
    }
}