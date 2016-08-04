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
    getFirstname() {
        return this.get('lastname');
    }
}

@Attributes({
    age: 0,
    profile: Profile
})
class User extends AbstractModel {
    getSomething() {
        return 'something';
    }
}

let p = new Profile({
    firstname: "David",
    lastname: "Riedl",
    email: "daves.weblab@gmail.com",
});

let u = new User({
    age: 24,
    profile: p
});

console.log(u.get('profile.getFirstname'));