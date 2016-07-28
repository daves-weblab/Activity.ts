import {Signal} from "../../util/Events";

/**
 * Simple signal abstraction for lifecycle events.
 *
 * This can be used by components extending Lifecycle
 * to provide external lifecycle hooks to either other
 * components or subclasses.
 *
 * @author David Riedl <daves.weblab@gmail.com>
 */
export interface LifecycleEvent extends Signal {
}