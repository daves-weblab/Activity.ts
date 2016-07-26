import {Lifecycle} from "./Lifecycle";

/**
 * Implements lifecycle callbacks so subclasses do not need
 * to implement them if unecessary
 */
export abstract class LifecycleAdapter implements Lifecycle {
    abstract create();

    abstract start();

    abstract pause();

    abstract resume();

    abstract stop();

    abstract destroy();

    onCreate() {
    }

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