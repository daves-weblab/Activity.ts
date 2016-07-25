import {Hashable} from "./Hashable";
import {AbstractMap} from "./AbstractMap";

export class HashMap<K extends Hashable, V> extends AbstractMap<K, V> {
    protected getHash(key:K):string {
        return key.hash();
    }
}