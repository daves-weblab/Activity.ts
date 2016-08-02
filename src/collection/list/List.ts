import {Collection} from "../Collection";
import {Comparator} from "../comparator/Comparator";

export interface List<T> extends Collection<T> {
    add(element:T);

    remove(element:T, all?:boolean);

    removeAll(elements:List<T>);

    removeByIndex(index:number);
    
    setComparator(comparator:Comparator<T>);

    sort();
}