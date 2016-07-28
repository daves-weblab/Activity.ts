/**
 * This exception is thrown by an activity if a lifecycle method
 * is called on it even though it has already been destroyed beforehand.
 *
 * @author David Riedl <daves.weblab@gmail.com>
 */
export class ActivityAlreadDestroyedException extends Error {
}