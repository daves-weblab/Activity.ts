import {UUID} from "../../util/uuid/UUID";
import {LifecycleAdapter} from "../lifecycle/LifecycleAdapter";
import {Context} from "../content/Context";

// register namespace for activities, every activity receives
// a internal id
UUID.createNamespace(Activity.UUID_NAMESPACE);

export class Activity extends LifecycleAdapter {
    public static get UUID_NAMESPACE():string { return 'activity'}

    private id:number;

    constructor(context:Context) {
        this.id = UUID.getId(Activity.UUID_NAMESPACE);
    }

    getApplication() {
        // TODO
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