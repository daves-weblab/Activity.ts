export function prototype(value:any) {
    return ((target:any, key:string) => {
        target[key] = value;
    });
}