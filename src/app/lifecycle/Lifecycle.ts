import {Signal} from "../../util/Events";

export interface Lifecycle {
    create();

    start();

    pause();

    resume();

    stop();

    destroy();

    onCreate();

    onStart();
    
    onPause();
    
    onResume();
    
    onStop();
    
    onDestroy();
}

export interface LifecycleEvent extends Signal {}