import {AbstractMap} from "./AbstractMap";

export class StringMap<T> extends AbstractMap<any, T> {
    protected getHash(key:any):string {
        return key.toString();
    }
}