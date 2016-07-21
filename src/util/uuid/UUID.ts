import {ArrayHelper} from "../array/ArrayHelper";
import {NoSuchNamespaceException} from "./exception/NoSuchNamespaceException";

interface IdNamespace {
    currentId:number,
    unset:Array<number>
}

let DEFAULT_NAMESPACE = "default";

let namespaces:Object = {
    DEFAULT_NAMESPACE: {
        currentId: 1,
        unset: []
    }
};

export namespace UUID {
    export function createNamespace(namespace:string) {
        if (namespaces[namespace]) return;

        namespaces[namespace] = {
            currentId: 1,
            unset: []
        };
    }

    export function getId(namespace:string = DEFAULT_NAMESPACE):number {
        let idNamespace:IdNamespace = namespaces[namespace];

        if (!namespace) throw new NoSuchNamespaceException();

        let uuid:number;

        if (!idNamespace.unset.length) {
            uuid = idNamespace.currentId;
            idNamespace.currentId++;
        } else {
            uuid = ArrayHelper.first(idNamespace.unset);
            idNamespace.unset = ArrayHelper.removeFirst(idNamespace.unset);
        }

        return uuid;
    }

    export function unsetId(id:number, namespace:string = DEFAULT_NAMESPACE) {
        let idNamespace:IdNamespace = namespaces[namespace];

        if(!namespace) throw new NoSuchNamespaceException();

        ArrayHelper.add(idNamespace.unset, id);
    }
}