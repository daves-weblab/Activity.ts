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
    lastname: ""
})
class Profile extends AbstractModel {
    getFirstname() {
        return "I am a fake firstname :D";
    }

    getLastname() {
        return this.get('lastname');
    }
}

@Attributes({
    age: 0,
    profile: Profile
})
class User extends AbstractModel {
    getProfile() {
        return this.get('profile');
    }
}

@Attributes({
    email: "",
    password: "",
    user: User
})
class Member extends AbstractModel {
}

let m = new Member({
    email: "daves.weblab@gmail.com",
    password: "hashed_pw",
    user: new User({
        age: 24,
        profile: new Profile({
            firstname: "David",
            lastname: "Riedl"
        })
    })
});

console.log(m.get('email'));
console.log(m.get('user.age'));
console.log(m.get('user.profile.firstname'));
console.log(m.get('user.profile.getFirstname'));
console.log(m.get('user.getProfile.getFirstname'));