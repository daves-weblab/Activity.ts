import * as tsUnit from "./tsUnit/tsUnit";
import {UnitHelper} from "./tsUnit/UnitHelper";

import * as HashMapTests from "./collection/map/MapTest";
import * as ListTests from "./collection/list/ListTest";
import * as ActivityTests from "./app/ActivityTest";
import * as EventsTest from "./app/EventTest";
import {GetSetable} from "../src/util/object/GetSetable";

let result = new tsUnit.Test(
    HashMapTests,
    ListTests,
    ActivityTests,
    EventsTest
).run();

UnitHelper.niceResults(result);