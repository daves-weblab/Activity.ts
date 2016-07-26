import {UUID} from "../../util/uuid/UUID";
import {LifecycleAdapter} from "../lifecycle/LifecycleAdapter";
import {StringMap} from "../../collection/map/StringMap";
import {ActivityState} from "./ActivityState";

export class Activity extends LifecycleAdapter {
    public static get UUID_NAMESPACE():string {
        return 'activity';
    }

    private id:number = null;
    private state:ActivityState;
    private parent:Activity = null;
    private children:StringMap<Activity>;

    constructor(create:boolean = true) {
        super();

        if (create) {
            this.create();
        }
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

        if(child) {
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
        // unset the activities id
        UUID.unsetId(this.id, Activity.UUID_NAMESPACE);
        this.id = null;
    }
}

// register namespace for activities, every activity receives
// an internal id
UUID.createNamespace(Activity.UUID_NAMESPACE);