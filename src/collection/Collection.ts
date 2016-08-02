import {Iterable} from "./iterator/Iterable";
import {List} from "./list/List";

/**
 * Collection interface for lists, queues and other
 * data-structures.
 *
 * Provides a global interface for finding, iterating
 * and sorting collections implementing this interface.
 *
 * @author David Riedl <daves.weblab@gmail.com>
 */
export interface Collection<T> extends Iterable<T> {
    /**
     * find an element using a predicate method.
     *
     * @param {boolean} predicate
     *  predicate method returning true or false if found.
     */
    find(predicate:(element:T) => boolean):T;

    /**
     * similar to find, can return multiple elements.
     *
     * @param {boolean} predicate
     *  predicate method returning true or false if found.
     */
    where(predicate:(element:T) => boolean):List<T>;

    /**
     * iterate over the collection and pass each
     * element to the iteration method.
     *
     * @param {Function} iteration
     */
    forEach(iteration:(element:T) => any);

    /**
     * apply a method on each element in order
     * to change it.
     *
     * @param {Function} operator
     */
    map(operator:(element:T) => T);

    /**
     * get the size of the collection.
     *
     * @returns {number}
     */
    size():number;

    /**
     * clear the collection.
     */
    clear();

    /**
     * swap two elements on the given indizes.
     *
     * @param {number} index1
     * @param {number} index2
     */
    swap(index1:number, index2:number);

    /**
     * get the element on the given index.
     *
     * @param {number} index
     * @returns {T}
     */
    at(index:number):T;
}