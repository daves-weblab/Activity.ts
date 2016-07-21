import {ArrayList} from "../src/collection/list/ArrayList";

let arrayList:ArrayList<number> = new ArrayList<number>();

arrayList.add(1);
arrayList.add(3);
arrayList.add(2);

arrayList.remove(3);

arrayList.forEach((element:number) => {
    console.log(element);
});