import {Test, TestDescription} from "./tsUnit";
import {forEach} from "../../src/util/object/Objects";

interface GroupedResult {
    passed:boolean,
    description:TestDescription
}

function groupDescription(groupedResult:Object, passed:boolean, description:TestDescription) {
    if (!groupedResult[description.testName]) {
        groupedResult[description.testName] = [];
    }

    groupedResult[description.testName].push({
        passed: passed,
        description: description
    });
}

export namespace UnitHelper {
    const MESSAGE_LENGTH = 30;

    export function niceResults(result:Test) {
        let groupedResult = {};

        result.passes.forEach((passed:TestDescription) => {
            groupDescription(groupedResult, true, passed);
        });

        result.errors.forEach((error:TestDescription) => {
            groupDescription(groupedResult, false, error);
        });

        console.log('Unit-test finished ' + (result.errors.length > 0 ? 'with errors' : 'successfully'));
        console.log((result.passes.length + result.errors.length) + ' tests were executed (' + result.passes.length + ' ... ' + result.errors.length + ')');

        forEach(groupedResult, (key:string, value:Array<GroupedResult>) => {
            console.log();
            console.log('-------------------');
            console.log();

            console.log('Test-Class: ' + key);

            value.forEach((testResult:GroupedResult) => {
                let logFunction = testResult.passed ? console.log : console.error;

                logFunction(UnitHelper.tapifyMessage(testResult.description.funcName) + testResult.description.message);
            });
        });
    }

    export function tapifyMessage(message:string) {
        let padding = MESSAGE_LENGTH - message.length;

        if (padding > 0) {
            for (let i = 0; i < padding; i++) {
                message += " ";
            }

            message += "\t\t";
        } else {
            message += "\n";
        }

        return message;
    }
}