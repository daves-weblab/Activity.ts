import {Iterator} from "../Iterator";
import {Entry} from "../../map/Entry";
import {List} from "../../list/List";
import {Map} from "../../map/Map";
import {IndexOutOfBoundsException} from "../../../exceptions/IndexOutOfBoundsException";

export class MapIterator<K, V> implements Iterator<Entry<K, V>> {
    private keySet:List<K>;
    private current:number = 0;
    
    constructor(private map:Map<K, V>) {
        this.keySet = map.keySet();
    }

    hasNext():boolean {
        return this.current < this.keySet.size();
    }

    next():Entry<K, V> {
        let key:K = this.keySet.at(this.current++);
        return new Entry<K, V>(key, this.map.get(key));
    }
    
    remove() {
        if(this.current == 0) throw new IndexOutOfBoundsException("can not delete without previous call to next().");

        let key:K = this.keySet.at(--this.current);

        this.keySet.remove(key);
        this.map.remove(key);
    }
}