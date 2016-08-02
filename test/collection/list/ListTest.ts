import * as tsUnit from "../../tsUnit/tsUnit";
import {ArrayList} from "../../../src/collection/list/ArrayList";
import {List} from "../../../src/collection/list/List";
import {NumberComparator} from "../../../src/collection/comparator/NumberComparator";
import * as Collections from "../../../src/util/collection/Collections";
import {Collection} from "../../../src/collection/Collection";

class ListObject {
    constructor(public value:string) {}

    toString() {
        return this.value;
    }
}

export class ListTest extends tsUnit.TestClass {
    private list:List<ListObject> = new ArrayList<ListObject>();

    private OBJ1:ListObject = new ListObject('test1');
    private OBJ2:ListObject = new ListObject('test2');

    testAdd() {
        this.areIdentical(0, this.list.size());

        this.list.add(this.OBJ1);
        this.list.add(this.OBJ2);

        this.areIdentical(2, this.list.size());
    }

    testGet() {
        this.areIdentical(this.OBJ1, this.list.at(0));
        this.areIdentical(this.OBJ2, this.list.at(1));
    }

    testFind() {
        this.areIdentical(this.OBJ1, this.list.find((element:ListObject) => {
            return element.value == this.OBJ1.value;
        }));
    }

    testRemove() {
        this.list.remove(this.OBJ1);

        this.areIdentical(null, this.list.find((element:ListObject) => {
            return element.value == this.OBJ1.value;
        }));

        this.areIdentical(1, this.list.size());
    }
    
    testSort() {
        let list:List<number> = new ArrayList<number>();

        for(let i = 0; i < 10; i++) {
            list.add(Math.floor((Math.random() * 1000) + 1));
        }

        let output:string = "";

        Collections.sort(list, new NumberComparator());

        this.isTrue(isSorted(list));
    }
}

function isSorted(collection:Collection<number>):boolean {
    let previous:number = 0;

    for(let i = 0; i < collection.size(); i++) {
        if(i == 0) {
            previous = collection.at(i);
            continue;
        } else {
            if(previous > collection.at(i)) return false;
            previous = collection.at(i);
        }
    }

    return true;
}