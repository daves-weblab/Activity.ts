export interface Lifecycle {
    start();

    pause();

    resume();

    stop();

    destroy();

    onStart();
    
    onPause();
    
    onResume();
    
    onStop();
    
    onDestroy();
}