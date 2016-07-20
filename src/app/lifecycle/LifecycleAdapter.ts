import {Lifecycle} from "./Lifecycle";

/**
 * Implements lifecycle callbacks so subclasses do not need
 * to implement them if unecessary
 */
export abstract class LifecycleAdapter implements Lifecycle {
    onStart() {
    }

    onPause() {
    }

    onResume() {
    }

    onStop() {
    }

    onDestroy() {
    }
}