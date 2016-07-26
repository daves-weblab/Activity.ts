import * as tsUnit from "./tsUnit/tsUnit";
import {UnitHelper} from "./tsUnit/UnitHelper";

import * as HashMapTests from "./map/MapTest";

let result = new tsUnit.Test(
    HashMapTests
).run();

UnitHelper.niceResults(result);