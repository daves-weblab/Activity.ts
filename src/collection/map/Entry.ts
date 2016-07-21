export class Entry<K, V> {
    constructor(private key:K, private value:V) {}
    
    getKey() {
        return this.key;
    }
    
    getValue() {
        return this.value;
    }
}