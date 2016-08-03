// import * as tsUnit from "./tsUnit/tsUnit";
// import {UnitHelper} from "./tsUnit/UnitHelper";
//
// import * as HashMapTests from "./collection/map/MapTest";
// import * as ListTests from "./collection/list/ListTest";
// import * as ActivityTests from "./app/ActivityTest";
// import * as EventsTest from "./app/EventTest";
//
// let result = new tsUnit.Test(
//     HashMapTests,
//     ListTests,
//     ActivityTests,
//     EventsTest
// ).run();
//
// UnitHelper.niceResults(result);

import {AbstractModel, Attributes} from "../src/model/AbstractModel";

@Attributes({
    firstname: "",
    lastname: "",
    email: ""
})
class Profile extends AbstractModel {
}

@Attributes({
    isAdmin: true
})
class AdminProfile extends Profile {
}

let p = new Profile({
    firstname: 'David'
});
let p2 = new AdminProfile({
    firstname: 'David',
    lastname: 'Riedl'
});
let p1 = new Profile();

console.log(p2.getAttributes());
console.log(p2.get('isAdmin'));

console.log('done');