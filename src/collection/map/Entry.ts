export class Entry<K, V> {
    constructor(private key:K, private value:V) {}
    
    get key() {
        return this.key;
    }
    
    getKey() {
        return this.key;
    }
    
    get value() {
        return this.value;
    }
    
    getValue() {
        return this.value;
    }
}