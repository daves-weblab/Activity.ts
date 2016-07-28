import {UUID} from "../../util/uuid/UUID";
import {LifecycleAdapter} from "../lifecycle/LifecycleAdapter";
import {StringMap} from "../../collection/map/StringMap";
import {ActivityState} from "./ActivityState";
import {EventDispatcher, EventDispatcherContainer} from "../../util/Events";
import {LifecycleEvent} from "../lifecycle/Lifecycle";
import {ActivityAlreadDestroyedException} from "./ActivityAlreadDestroyedException";
import {ArrayHelper} from "../../util/array/ArrayHelper";

/**
 * Activities represent small portions of an application that can either
 * run in the background or be rendered as some sort of module on the page.
 * Activities can be nested and manage their children accordingly based on their
 * own lifecycle.
 */
export class Activity extends LifecycleAdapter {
    public static get UUID_NAMESPACE():string {
        return 'activity';
    }

    private static LIFECYCLE_METHODS:string[] = [
        'create',
        'start',
        'pause',
        'resume',
        'stop',
        'destroy'
    ];

    private id:number = null;
    private state:ActivityState;
    private parent:Activity = null;
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
        'stop',
        'destroy'
    ]);

    constructor(create:boolean = true) {
        super();

        this.children = new StringMap<Activity>();
        this.id = UUID.getId(Activity.UUID_NAMESPACE);

        if (create) {
            this.create();
        }
    }

    getId() {
        return this.id;
    }

    getApplication() {
        // todo
    }

    hasParent():boolean {
        return this.parent != null;
    }

    getParent():Activity {
        return this.parent;
    }

    setParent(parent:Activity) {
        this.parent = parent;
    }

    removeParent() {
        this.parent = null;
    }

    addChild(child:Activity) {
        if (child.hasParent()) {
            child.getParent().removeChild(child);
        }

        child.setParent(this);

        this.children.put(child.getId(), child);
    }

    getChild(id:number) {
        return this.children.get(id);
    }

    removeChild(child:number | Activity) {
        let id;

        if (child instanceof Activity) {
            id = child.getId();
        } else {
            id = child;
        }

        this.removeChildById(id);
    }

    removeChildById(id:number) {
        let child = this.children.get(id);

        if (child) {
            child.removeParent();
            this.children.remove(id);
        }
    }

    isRunning() {
        return this.state == ActivityState.STARTED || this.state == ActivityState.RESUMED;
    }

    isDestroyed() {
        return this.state == ActivityState.DESTROYED;
    }

    getState():ActivityState {
        return this.state;
    }

    getDispatcher(name:string):EventDispatcher<LifecycleEvent> {
        return this.dispatcherContainer.getDispatcher(name);
    }
    
    private ensureAlive() {
        if(this.getState() == ActivityState.DESTROYED) throw new ActivityAlreadDestroyedException();
    }

    create() {
        this.ensureAlive();

        this.state = ActivityState.CREATED;

        this.getDispatcher('create').dispatch();

        this.onCreate();

        this.applyToChildren('create');
    }

    start() {
        this.ensureAlive();

        // todo

        this.state = ActivityState.STARTED;

        this.getDispatcher('start').dispatch();

        this.onStart();

        this.applyToChildren('start');
    }

    pause() {
        this.applyToChildren('pause');

        this.ensureAlive();

        // todo

        this.state = ActivityState.PAUSED;

        this.getDispatcher('pause').dispatch();

        this.onPause();
    }

    resume() {
        this.ensureAlive();

        // todo

        this.state = ActivityState.RESUMED;

        this.getDispatcher('resume').dispatch();

        this.onResume();

        this.applyToChildren('resume');
    }

    stop() {
        this.applyToChildren('stop');

        this.ensureAlive();

        // todo

        this.state = ActivityState.STOPPED;

        this.getDispatcher('stop').dispatch();

        this.onStop();
    }

    destroy() {
        this.applyToChildren('destroy');

        this.ensureAlive();
        
        // todo

        this.state = ActivityState.DESTROYED;

        this.getDispatcher('destroy').dispatch();

        this.onDestroy();

        // cleanup logic is complete
        // unset the activities id
        UUID.unsetId(this.id, Activity.UUID_NAMESPACE);
        this.id = null;
    }
    
    private isLifecycleMethod(lifecycleMethod:string) {
        return ArrayHelper.exists(Activity.LIFECYCLE_METHODS, lifecycleMethod);
    }
    
    private applyToChildren(lifecycleMethod:string) {
        if(!this.isLifecycleMethod(lifecycleMethod)) return;

        this.children.valueSet().forEach((child:Activity) => {
            child[lifecycleMethod].call(child);
        });
    }
}

// register namespace for activities, every activity receives
// an internal id
UUID.createNamespace(Activity.UUID_NAMESPACE);