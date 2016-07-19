export interface Iterator<T> {
    hasNext():boolean;

    getNext():T;

    remove();
}