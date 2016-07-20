import {UUID} from "../../util/uuid/UUID";
import {LifecycleAdapter} from "../lifecycle/LifecycleAdapter";
import {Context} from "../content/Context";
import {List} from "../../collection/list/List";
import {ArrayList} from "../../collection/list/ArrayList";

// register namespace for activities, every activity receives
// a internal id
UUID.createNamespace(Activity.UUID_NAMESPACE);

export class Activity extends LifecycleAdapter {
    public static get UUID_NAMESPACE():string { return 'activity'}

    private id:number;
    private children:List<Activity>;

    constructor(context:Context) {
        this.id = UUID.getId(Activity.UUID_NAMESPACE);
        this.children = new ArrayList<Activity>();
    }

    getId() {
        return this.id;
    }

    getApplication() {
        // TODO
    }

    addChild(child:Activity) {
        
    }

    getChild(key:number) {

    }

    removeChild(child:number | Activity) {
        let id;

        if(child instanceof Activity) {
            id = child.getId();
        } else {
            id = child;
        }

        this.removeChildById(id);
    }

    removeChildById(id:number) {

    }

    start() {
        // TODO
        this.onStart();
    }

    pause() {
        // TODO
        this.onPause();
    }

    resume() {
        // TODO
        this.onResume();
    }

    stop() {
        // TODO
        this.onStop();
    }

    destroy() {
        // TODO
        this.onDestroy();

        // cleanup logic is complete
        // unset the activities' id
        UUID.unsetId(this.id, Activity.UUID_NAMESPACE);
    }
}