import * as tsUnit from "./tsUnit/tsUnit";
import {UnitHelper} from "./tsUnit/UnitHelper";

import * as HashMapTests from "./collection/map/MapTest";
import * as ListTests from "./collection/list/ListTest";
import * as ActivityTests from "./app/ActivityTest";
import * as EventsTest from "./app/EventTest";

let result = new tsUnit.Test(
    HashMapTests,
    ListTests,
    ActivityTests,
    EventsTest
).run();

UnitHelper.niceResults(result);

// import {AbstractModel} from "../src/model/AbstractModel";
//
// class ModelA extends AbstractModel {
//     protected attributes:Object = {
//         'profile': null,
//         'age': 0
//     }
// }
//
// let dude = ModelA.create({
//     'profile': {
//         'firstname': 'David',
//         'lastname': 'Riedl',
//         'email': 'daves.weblab@gmail.com'
//     },
//     'age': 24
// });
//
// console.log(dude.get('profile.email'));