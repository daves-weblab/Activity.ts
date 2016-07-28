export interface Subscribable<Handler extends Function> {
    subscribe(domain:string, handler:Handler, context?:any):void;
    unsubscribe(domain:string, handler?:Handler, context?:any):void;
}