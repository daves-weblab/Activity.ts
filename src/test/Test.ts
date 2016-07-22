import {ArrayList} from "../collection/list/ArrayList";

let arrayList:ArrayList<number> = new ArrayList<number>();

arrayList.add(1);
arrayList.add(3);
arrayList.add(2);

arrayList.forEach((element:number) => {
   console.log(element);
});

arrayList.remove(3);

console.log('3 removed');

arrayList.forEach((element:number) => {
    console.log(element);
});