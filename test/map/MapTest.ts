import * as tsUnit from "../tsUnit/tsUnit";
import {HashMap} from "../../src/collection/map/HashMap";
import {Hashable} from "../../src/collection/map/Hashable";

class HashableObject implements Hashable {
    constructor(private key:any) {
    }

    hash():string {
        return this.key.toString();
    }

    toString() {
        return 'Test[' + this.key.toString() + ']';
    }
}

export class HashMapTest extends tsUnit.TestClass {
    private HASHABLE1 = new HashableObject("I am a Key");
    private HASHABLE2 = new HashableObject(2);

    private map:HashMap<HashableObject, number> = new HashMap<HashableObject, number>();

    setup() {
        this.map.put(this.HASHABLE1, 1);
        this.map.put(this.HASHABLE2, 2);
    }

    testSize() {
        this.areIdentical(2, this.map.size(), 'size is wrong!');
    }

    testGet() {
        this.areIdentical(this.map.get(this.HASHABLE1), 1);
        this.areIdentical(this.map.get(this.HASHABLE2), 2);
    }
}