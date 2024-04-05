"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const text_util_1 = require("../util/common/text.util");
class EntityDefinition {
    toPlain() {
        const ret = (0, text_util_1.snakeObjectToCamelObject)(this);
        return ret;
    }
}
exports.default = EntityDefinition;
//# sourceMappingURL=entity.definition.js.map