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