import * as tsUnit from "./tsUnit/tsUnit";
import * as HashMapTests from "./map/MapTest";

var tap = new tsUnit.Test(HashMapTests).run().getTapResults();
console.log(tap);