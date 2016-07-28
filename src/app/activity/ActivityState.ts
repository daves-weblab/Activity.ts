/**
 * Represents the states an activity can be in.
 *
 * @author David Riedl <daves.weblab@gmail.com>
 */
export enum ActivityState {
    /**
     * constructor was called.
     */
    CONSTRUCTED,

    /**
     * created was called.
     */
    CREATED,

    /**
     * started was called.
     */
    STARTED,

    /**
     * resume was called.
     */
    RESUMED,

    /**
     * pause was called.
     */
    PAUSED,

    /**
     * stop was called.
     */
    STOPPED,

    /**
     * destroy was called.
     */
    DESTROYED
}