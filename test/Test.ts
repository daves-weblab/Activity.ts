import {ArrayList} from "../src/collection/list/ArrayList";
import {Iterator} from "../src/collection/iterator/Iterator";

let arrayList:ArrayList<number> = new ArrayList<number>();

arrayList.add(1);  
arrayList.add(2);

let iterator:Iterator<number> = arrayList.iterator();

while(iterator.hasNext()) {
    console.log(iterator.next());
}  