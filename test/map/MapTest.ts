import * as tsUnit from "../tsUnit/tsUnit";
import {HashMap} from "../../src/collection/map/HashMap";
import {Hashable} from "../../src/collection/map/Hashable";
import {Entry} from "../../src/collection/map/Entry";
import {Iterator} from "../../src/collection/iterator/Iterator";

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
        this.areIdentical(2, this.map.size());
    }

    testGet() {
        this.areIdentical(this.map.get(this.HASHABLE1), 1);
        this.areIdentical(this.map.get(this.HASHABLE2), 2);
    }

    testIterator() {
        let iterator:Iterator<Entry<HashableObject, number>> = this.map.iterator();

        while(iterator.hasNext()) {
            let entry:Entry<HashableObject, number> = iterator.next();

            if(entry.getKey() == this.HASHABLE1) {
                this.areIdentical(this.map.get(this.HASHABLE1), 1);
            } else if(entry.getKey() == this.HASHABLE2) {
                this.areIdentical(this.map.get(this.HASHABLE2), 2);
            } else {
                this.fail("iterator returned wrong value. " + entry.getKey() + ", " + entry.getValue());
            }
        }
    }

    testRemove() {
        this.map.remove(this.HASHABLE1);

        this.areIdentical(1, this.map.size());
        this.areIdentical(null, this.map.get(this.HASHABLE1));
    }
}