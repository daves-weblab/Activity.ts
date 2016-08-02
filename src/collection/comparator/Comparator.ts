export interface Comparator<T> {
    compare(obj1:T, obj2:T):number;
}