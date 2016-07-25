import {Iterator} from "../Iterator";
import {Entry} from "../../map/Entry";
import {HashMap} from "../../map/HashMap";
import {Hashable} from "../../map/Hashable";
import {List} from "../../list/List";
import {IndexOutOfBoundsException} from "../../../exceptions/IndexOutOfBoundsException";

export class HashMapIterator<K extends Hashable, V> implements Iterator<Entry<K, V>> {
    private keySet:List<K>;
    private current:number = 0;
    
    constructor(private map:HashMap<K, V>) {
        this.keySet = map.keySet();
    }

    hasNext():boolean {
        return this.current < this.keySet.size();
    }

    next():Entry<K, V> {
        let key:K = this.keySet.get(this.current++);
        return new Entry<K, V>(key, this.map.get(key));
    }

    remove() {
        if(this.current == 0) throw new IndexOutOfBoundsException("can not delete without previous call to next().");

        let key:K = this.keySet.get(--this.current);

        this.keySet.remove(key);
        this.map.remove(key);
    }
}