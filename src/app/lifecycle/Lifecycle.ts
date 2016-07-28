/**
 * Lifecycle of certain components like activities.
 *
 * They can be created, started, paused, resumed, stopped and destroyed
 * while providing a corresponding callback for each lifecycle method, so
 * that subclasses can hook into it.
 *
 * @author David Riedl <daves.weblab@gmail.com>
 */
export interface Lifecycle {
    /**
     * create the component.
     */
    create();

    /**
     * start the component.
     */
    start();

    /**
     * pause the component.
     */
    pause();

    /**
     * resume the component.
     */
    resume();

    /**
     * stop the component.
     */
    stop();

    /**
     * destroy the component.
     */
    destroy();

    /**
     * lifecycle callback for create.
     */
    onCreate();

    /**
     * lifecycle callback for start.
     */
    onStart();

    /**
     * lifecycle callback for pause.
     */
    onPause();

    /**
     * lifecycle callback for resume.
     */
    onResume();

    /**
     * lifecycle callback for stop.
     */
    onStop();

    /**
     * lifecycle callback for destroy.
     */
    onDestroy();
}