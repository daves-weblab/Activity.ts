import {Iterator} from "../../src/collection/iterator/Iterator";
import {Entry} from "../../src/collection/map/Entry";
import {HashMap} from "../../src/collection/map/HashMap";
import {Hashable} from "../../src/collection/map/Hashable";

class Test implements Hashable {
    constructor(private key:any) {
    }

    hash():string {
        return this.key.toString();
    }

    toString() {
        return 'Test[' + this.key.toString() + ']';
    }
}

let map:HashMap<Test, number> = new HashMap<Test, number>();

let key1 = new Test('ahm');
let key2 = new Test(1);

map.put(key1, 1);
map.put(key2, 2);

console.log(map.has(key1));
console.log(map.has(key2));
console.log(map.has(new Test('foo')));

console.log(map.get(key1));
console.log(map.get(key2));
console.log(map.get(new Test('foo')));

console.log('---- keys ----');

map.keySet().forEach((key:any) => {
   console.log(key);
});

console.log('---- iterator ----');

let iterator:Iterator<Entry<any, number>> = map.iterator();

while(iterator.hasNext()) {
    let entry:Entry<any, number> = iterator.next();

    console.log(entry.getKey() + ', ' + entry.getValue());

    if(entry.getValue() == 1) {
        console.log('1 found, removing key ' + entry.getKey() + ' ...');
        iterator.remove();
    }
}

console.log('---- keys ----');

map.keySet().forEach((key:any) => {
    console.log(key);
});

console.log('---- removing key 1 ----');

map.remove(key2);

console.log('---- keys ----');

map.keySet().forEach((key:any) => {
    console.log(key);
});
