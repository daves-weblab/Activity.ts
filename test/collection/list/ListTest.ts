import * as tsUnit from "../../tsUnit/tsUnit";
import {ArrayList} from "../../../src/collection/list/ArrayList";
import {List} from "../../../src/collection/list/List";

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
        this.areIdentical(this.OBJ1, this.list.get(0));
        this.areIdentical(this.OBJ2, this.list.get(1));
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
}