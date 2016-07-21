var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("src/collection/iterator/Iterator", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("src/collection/iterator/array/ArrayIterator", ["require", "exports"], function (require, exports) {
    "use strict";
    var ArrayIterator = (function () {
        function ArrayIterator(elements) {
            this.elements = elements;
            this.current = 0;
        }
        ArrayIterator.prototype.hasNext = function () {
            return this.current < this.elements.length;
        };
        ArrayIterator.prototype.next = function () {
            return this.elements[this.current++];
        };
        ArrayIterator.prototype.remove = function () {
            if (this.current == 0)
                throw new Error("Cannot remove element on index -1");
            this.current--;
            this.elements = this.elements.splice(this.current, 1);
        };
        return ArrayIterator;
    }());
    exports.ArrayIterator = ArrayIterator;
});
define("src/exceptions/IndexOutOfBoundsException", ["require", "exports"], function (require, exports) {
    "use strict";
    var IndexOutOfBoundsException = (function (_super) {
        __extends(IndexOutOfBoundsException, _super);
        function IndexOutOfBoundsException() {
            _super.apply(this, arguments);
        }
        return IndexOutOfBoundsException;
    }(Error));
    exports.IndexOutOfBoundsException = IndexOutOfBoundsException;
});
define("src/util/array/ArrayHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    var ArrayHelper;
    (function (ArrayHelper) {
        function add(elements, element) {
            elements.push(element);
        }
        ArrayHelper.add = add;
        function remove(elements, element, all) {
            if (all === void 0) { all = false; }
            var done = false;
            while (!done) {
                var index = elements.indexOf(element);
                if (index != -1) {
                    elements = ArrayHelper.removeByIndex(elements, index);
                    done = !all;
                }
                else {
                    done = true;
                }
            }
            return elements;
        }
        ArrayHelper.remove = remove;
        function first(elements) {
            if (!elements.length)
                return null;
            return elements[0];
        }
        ArrayHelper.first = first;
        function removeFirst(elements) {
            return ArrayHelper.removeByIndex(elements, 0);
        }
        ArrayHelper.removeFirst = removeFirst;
        function removeByIndex(elements, index) {
            if (index >= elements.length)
                return elements;
            return elements.splice(index, 1);
        }
        ArrayHelper.removeByIndex = removeByIndex;
    })(ArrayHelper = exports.ArrayHelper || (exports.ArrayHelper = {}));
});
define("src/collection/iterator/Iterable", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("src/collection/Collection", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("src/collection/list/List", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("src/collection/list/ArrayList", ["require", "exports", "src/collection/iterator/array/ArrayIterator", "src/exceptions/IndexOutOfBoundsException", "src/util/array/ArrayHelper"], function (require, exports, ArrayIterator_1, IndexOutOfBoundsException_1, ArrayHelper_1) {
    "use strict";
    var ArrayList = (function () {
        function ArrayList() {
            this.elements = [];
        }
        ArrayList.prototype.add = function (element) {
            ArrayHelper_1.ArrayHelper.add(this.elements, element);
        };
        ArrayList.prototype.remove = function (element, all) {
            if (all === void 0) { all = false; }
            this.elements = ArrayHelper_1.ArrayHelper.remove(this.elements, element, all);
        };
        ArrayList.prototype.removeByIndex = function (index) {
            if (index >= this.elements.length)
                throw new IndexOutOfBoundsException_1.IndexOutOfBoundsException();
            this.elements = ArrayHelper_1.ArrayHelper.removeByIndex(this.elements, index);
        };
        ArrayList.prototype.find = function (predicate) {
            var iterator = this.iterator();
            var element;
            while (iterator.hasNext()) {
                element = iterator.next();
                if (predicate(element)) {
                    return element;
                }
            }
            return null;
        };
        ArrayList.prototype.where = function (predicate) {
            var elements = new ArrayList();
            var iterator = this.iterator();
            var element;
            while (iterator.hasNext()) {
                element = iterator.next();
                if (predicate(element)) {
                    elements.add(element);
                }
            }
            return elements;
        };
        ArrayList.prototype.iterator = function () {
            return new ArrayIterator_1.ArrayIterator(this.elements);
        };
        return ArrayList;
    }());
    exports.ArrayList = ArrayList;
});
define("test/Test", ["require", "exports", "src/collection/list/ArrayList"], function (require, exports, ArrayList_1) {
    "use strict";
    var arrayList = new ArrayList_1.ArrayList();
    arrayList.add(1);
    arrayList.add(2);
    var iterator = arrayList.iterator();
    while (iterator.hasNext()) {
        console.log(iterator.next());
    }
});
//# sourceMappingURL=test.js.map