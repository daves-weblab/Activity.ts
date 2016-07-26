import {UUID} from "../../util/uuid/UUID";
import {LifecycleAdapter} from "../lifecycle/LifecycleAdapter";
import {Context} from "../content/Context";
import {StringMap} from "../../collection/map/StringMap";
import {ActivityState} from "./ActivityState";

export class Activity extends LifecycleAdapter {
    public static get UUID_NAMESPACE():string {
        return 'activity'
    }

    private id:number = null;
    private state:ActivityState;
    private destroyed:boolean = false;
    private parent:Activity = null;
    private children:StringMap<Activity>;

    constructor(create:boolean = true) {
        super();

        this.create();
    }

    getId() {
        return this.id;
    }

    getApplication() {
        // TODO
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

    addChild(child:Activity) {
        if(child.hasParent()) {
            child.getParent().removeChild(child);
        }

        this.children.put(child.getId(), child);
    }

    getChild(id:number) {
        return this.children.get(key);
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
        this.children.remove(id);
    }

    isRunning() {
        return this.state == ActivityState.STARTED || this.state == ActivityState.RESUMED;
    }

    isDestroyed() {
        return this.destroyed;
    }

    getState():ActivityState {
        return this.state;
    }

    create() {
        this.id = UUID.getId(Activity.UUID_NAMESPACE);
        this.children = new StringMap<Activity>();

        this.state = ActivityState.CREATED;

        this.onCreate();
    }

    start() {
        // TODO

        this.state = ActivityState.STARTED;

        this.onStart();
    }

    pause() {
        // TODO

        this.state = ActivityState.PAUSED;

        this.onPause();
    }

    resume() {
        // TODO

        this.state = ActivityState.RESUMED;

        this.onResume();
    }

    stop() {
        // TODO

        this.state = ActivityState.STOPPED;

        this.onStop();
    }

    destroy() {
        // TODO

        this.state = ActivityState.DESTROYED;

        this.onDestroy();

        // cleanup logic is complete
        // unset the activities' id
        UUID.unsetId(this.id, Activity.UUID_NAMESPACE);
        this.id = null;
        this.destroyed = true;
    }
}

// register namespace for activities, every activity receives
// a internal id
UUID.createNamespace(Activity.UUID_NAMESPACE);