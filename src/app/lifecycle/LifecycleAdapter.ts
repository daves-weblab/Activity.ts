import {Lifecycle} from "./Lifecycle";

/**
 * Implements lifecycle callbacks so subclasses do not need
 * to implement them if unnecessary.
 *
 * @author David Riedl <daves.weblab@gmail.com>
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

    onRestart() {
    }

    onStop() {
    }

    onDestroy() {
    }
}