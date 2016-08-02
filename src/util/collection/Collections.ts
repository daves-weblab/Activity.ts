import {Collection} from "../../collection/Collection";
import {Comparator} from "../../collection/comparator/Comparator";

function partition<T>(collection:Collection<T>, comparator:Comparator<T>, low:number, high:number):number {
    let i:number = low;
    let j:number = high + 1;
    let v:T = collection.at(low);

    while(true) {
        while(comparator.compare(collection.at(++i), v) < 0) {
            if(i == high) break;
        }

        while(comparator.compare(v, collection.at(--j)) < 0) {
            if(j == low) break;
        }

        if(i >= j) break;

        collection.swap(i, j);
    }

    collection.swap(low, j);

    return j;
}

function doSort<T>(collection:Collection<T>, comparator:Comparator<T>, low:number, high:number) {
    if(high <= low) return;

    let split:number = partition(collection, comparator, low, high);

    doSort(collection, comparator, low, split -1);
    doSort(collection, comparator, split + 1, high);
}

export function sort<T>(collection:Collection<T>, comparator:Comparator<T>) {
    doSort(collection, comparator, 0, collection.size() - 1);
}