import * as tsUnit from "../tsUnit/tsUnit";
import {Activity} from "../../src/app/activity/Activity";

export class ActivityTest extends tsUnit.TestClass {
    idTest() {
        let a1:Activity = new Activity();
        let a2:Activity = new Activity();
        
        this.areIdentical(1, a1.getId());
        this.areIdentical(2, a2.getId());
        
        a1.destroy();
        
        let a3 = new Activity();
        
        this.areIdentical(1, a3.getId());
    }
}