import {Iterator} from "./Iterator";

export interface Iterable<T> {
    iterator(): Iterator<T>
}