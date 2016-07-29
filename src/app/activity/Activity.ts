import {UUID} from "../../util/uuid/UUID";
import {LifecycleAdapter} from "../lifecycle/LifecycleAdapter";
import {StringMap} from "../../collection/map/StringMap";
import {ActivityState} from "./ActivityState";
import {LifecycleEvent} from "../lifecycle/LifecycleEvent";
import {ActivityAlreadDestroyedException} from "./ActivityAlreadDestroyedException";
import {ArrayHelper} from "../../util/array/ArrayHelper";
import {EventDispatcherContainer} from "../event/EventDispatcherContainer";
import {EventDispatcher} from "../event/EventDispatcher";
import {ActivityNotYetCreatedException} from "./ActivityNotYetCreatedException";
import {Lifecycle} from "../lifecycle/Lifecycle";

/**
 * Activities represent small portions of an application that can either
 * run in the background or be rendered as some sort of module on the page.
 *
 * Activities can be nested and manage their children accordingly based on their
 * own lifecycle.
 * An activity is always created, started and resumed before its children. The children
 * on the other hand are always paused, stopped and destroyed before their parent.
 *
 * @author David Riedl <daves.weblab@gmail.com>
 */
export class Activity extends LifecycleAdapter {
    /**
     * namespace for the UUID framework for creating
     * ids for activities.
     *
     * @returns {string}
     */
    public static get UUID_NAMESPACE():string {
        return 'activity';
    }

    /**
     * valid lifecycle methods that are callable
     * on child activities.
     *
     * @type {string[]}
     */
    private static LIFECYCLE_METHODS:string[] = [
        'create',
        'start',
        'pause',
        'resume',
        'stop',
        'destroy'
    ];

    /**
     * id of the activity
     *
     * @type {number}
     * @private
     */
    private id:number = null;

    /**
     * state the activity is in
     *
     * @type {ActivityState}
     * @private
     */
    private state:ActivityState = ActivityState.CONSTRUCTED;

    /**
     * defines if the activity has been
     * created or not.
     * 
     * @type {boolean}
     * @private
     */
    private created:boolean = false;
    
    /**
     * parent activity
     *
     * @type {Activity}
     * @private
     */
    private parent:Activity = null;

    /**
     * child activities
     *
     * @type {StringMap<Activity>}
     * @private
     */
    private children:StringMap<Activity>;

    /**
     * Classes extending Activity can use these events to hook in between
     * the core lifecycle implementation and the lifecycle callbacks.
     *
     * This is useful for implementing activities which have custom
     * code before the actual lifecycle callbacks.
     *
     * This also enables libraries and plugins to hook into the lifecycle of an
     * activity.
     *
     * @type {EventDispatcherContainer<LifecycleEvent>}
     */
    private dispatcherContainer:EventDispatcherContainer<LifecycleEvent> = new EventDispatcherContainer<LifecycleEvent>([
        'create',
        'start',
        'pause',
        'resume',
        'restart',
        'stop',
        'destroy'
    ]);

    /**
     * @constructor
     *
     * @param {boolean} create
     *  define whether the activity should be created
     *  immediately or not.
     */
    constructor(create:boolean = true) {
        super();

        this.children = new StringMap<Activity>();
        this.id = UUID.getId(Activity.UUID_NAMESPACE);

        if (create) {
            this.create();
        }
    }

    /**
     * get id of the activity.
     *
     * @returns {number}
     */
    getId():number {
        return this.id;
    }

    getApplication() {
        // todo
    }

    /**
     * check if activity has a parent or not.
     *
     * @returns {boolean}
     */
    hasParent():boolean {
        return this.parent != null;
    }

    /**
     * get the parent of the activity.
     *
     * @returns {Activity}
     */
    getParent():Activity {
        return this.parent;
    }

    /**
     * set the parent of the activity.
     *
     * @param {Activity} parent
     */
    setParent(parent:Activity) {
        this.parent = parent;
    }

    /**
     * remove and unset the parent
     * of the activity.
     */
    removeParent() {
        this.parent = null;
    }

    /**
     * detach activity from its parent, clearing
     * the two-way reference.
     */
    detachFromParent() {
        if(this.hasParent()) {
            this.getParent().removeChild(this);
            this.removeParent();
        }
    }

    /**
     * add a child activity.
     *
     * @param {Activity} child
     */
    addChild(child:Activity) {
        if (child.hasParent()) {
            child.getParent().removeChild(child);
        }

        child.setParent(this);

        this.children.put(child.getId(), child);
    }

    /**
     * get a child activity by its id.
     *
     * @param id
     *  the child's id.
     *
     * @returns {Activity|null}
     */
    getChild(id:number):Activity {
        return this.children.get(id);
    }

    /**
     * remove a child.
     *
     * @param {Activity|number} child
     */
    removeChild(child:number | Activity) {
        let id;

        if (child instanceof Activity) {
            id = child.getId();
        } else {
            id = child;
        }

        this.removeChildById(id);
    }

    /**
     * remove a child by its id.
     *
     * @param {number} id
     */
    removeChildById(id:number) {
        let child = this.children.get(id);

        if (child) {
            child.removeParent();
            this.children.remove(id);
        }
    }

    /**
     * check if the activity is running.
     *
     * @returns {boolean}
     */
    isRunning() {
        return this.state == ActivityState.STARTED || this.state == ActivityState.RESUMED;
    }

    /**
     * check if the activity has been destroyed.
     *
     * @returns {boolean}
     */
    isDestroyed() {
        return this.state == ActivityState.DESTROYED;
    }

    /**
     * get the state of the activity.
     *
     * @returns {ActivityState}
     */
    getState():ActivityState {
        return this.state;
    }

    /**
     * check if the activity was already created.
     * 
     * @returns {boolean}
     */
    wasCreated() {
        return this.created;
    }

    /**
     * check if the activity is in the created state.
     * 
     * @returns {boolean}
     */
    isCreated() {
        return this.getState() == ActivityState.CREATED;
    }

    /**
     * check if the activity is in the started state.
     *
     * @returns {boolean}
     */
    isStarted() {
        return this.getState() == ActivityState.STARTED;
    }

    /**
     * check if the activity is in the resumed state.
     *
     * @returns {boolean}
     */
    isResumed() {
        return this.getState() == ActivityState.RESUMED;
    }

    /**
     * check if the activity is in the paused state.
     *
     * @returns {boolean}
     */
    isPaused() {
        return this.getState() == ActivityState.PAUSED;
    }

    /**
     * check if the activity is in the stopped state.
     *
     * @returns {boolean}
     */
    isStopped() {
        return this.getState() == ActivityState.STOPPED;
    }

    /**
     * get an event dispatcher for the lifecycle hooks.
     *
     * @param {string} name
     *  name of the event dispatcher
     *
     * @returns {EventDispatcher<LifecycleEvent>}
     */
    getDispatcher(name:string):EventDispatcher<LifecycleEvent> {
        return this.dispatcherContainer.getDispatcher(name);
    }

    /**
     * ensure that the activity has not been destroyed.
     *
     * @throws ActivityAlreadyDestroyedException
     */
    private ensureAlive(onCreate:boolean = false) {
        if (this.isDestroyed()) throw new ActivityAlreadDestroyedException();

        if(!onCreate) {
            if (!this.wasCreated()) throw new ActivityNotYetCreatedException();
        }
    }

    /**
     * create lifecycle method.
     *
     * @throws ActivityAlreadyDestroyedException
     *  if the activity has already been destroyed.
     */
    create():Lifecycle {
        this.ensureAlive(true);

        this.state = ActivityState.CREATED;

        this.getDispatcher('create').dispatch();
        this.onCreate();

        this.applyToChildren('create');
        
        this.created = true;
        
        return this;
    }

    /**
     * start lifecycle method.
     *
     * @throws ActivityAlreadyDestroyedException
     *  if the activity has already been destroyed.
     */
    start():Lifecycle {
        this.ensureAlive();

        if(!this.isCreated() && !this.isStopped()) return;

        if(this.isCreated()) {
            this.getDispatcher('start').dispatch();
            this.onStart();
        } else {
            this.getDispatcher('restart').dispatch();
            this.onRestart();
        }

        this.state = ActivityState.STARTED;

        this.applyToChildren('start');
        
        return this;
    }

    /**
     * pause lifecycle method.
     *
     * @throws ActivityAlreadyDestroyedException
     *  if the activity has already been destroyed.
     */
    pause():Lifecycle {
        this.ensureAlive();
        
        if(!this.isRunning()) return;

        this.applyToChildren('pause');

        this.state = ActivityState.PAUSED;

        this.getDispatcher('pause').dispatch();
        this.onPause();
        
        return this;
    }

    /**
     * resume lifecycle method.
     *
     * @throws ActivityAlreadyDestroyedException
     *  if the activity has already been destroyed.
     */
    resume():Lifecycle {
        this.ensureAlive();

        if(!this.isRunning()) return;

        this.state = ActivityState.RESUMED;

        this.getDispatcher('resume').dispatch();
        this.onResume();

        this.applyToChildren('resume');
        
        return this;
    }

    /**
     * stop lifecycle method.
     *
     * @throws ActivityAlreadyDestroyedException
     *  if the activity has already been destroyed.
     */
    stop():Lifecycle {
        this.ensureAlive();

        if(!this.isRunning() && !this.isPaused()) return;

        if(this.isRunning()) {
            this.pause();
        }

        this.applyToChildren('stop');

        this.state = ActivityState.STOPPED;

        this.getDispatcher('stop').dispatch();
        this.onStop();
        
        return this;
    }

    /**
     * destroy lifecycle method.
     */
    destroy() {
        this.ensureAlive();

        if(this.isRunning()) {
            this.stop();
        }

        this.applyToChildren('destroy');

        this.state = ActivityState.DESTROYED;

        this.getDispatcher('destroy').dispatch();
        this.onDestroy();

        // cleanup the event dispatchers
        this.dispatcherContainer.destroy();

        // clean up children and parent
        this.children.clear();
        this.removeParent();

        // cleanup logic is complete
        // unset the activities id
        UUID.unsetId(this.id, Activity.UUID_NAMESPACE);
        this.id = null;
    }

    /**
     * check if the passed method name is a valid lifecycle method.
     *
     * @param {string} lifecycleMethod
     * @returns {boolean}
     */
    private isLifecycleMethod(lifecycleMethod:string) {
        return ArrayHelper.exists(Activity.LIFECYCLE_METHODS, lifecycleMethod);
    }

    /**
     * apply a lifecycle method on all children.
     *
     * @param {string} lifecycleMethod
     */
    private applyToChildren(lifecycleMethod:string) {
        if (!this.isLifecycleMethod(lifecycleMethod)) return;

        this.children.valueSet().forEach((child:Activity) => {
            child[lifecycleMethod].call(child);
        });
    }
}

// register namespace for activities, every activity receives
// an internal id
UUID.createNamespace(Activity.UUID_NAMESPACE);