"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const common_1 = require("@nestjs/common");
const log_util_1 = require("./util/logger/log.util");
const class_transformer_1 = require("class-transformer");
let TestService = class TestService {
    test() {
        const a = {
            aa: 1,
            bb: "222",
            cc: [1, 2, 3, 4, 5],
            dd: new Date(),
        };
        log_util_1.default.log("Serialize A : ", (0, class_transformer_1.serialize)(a));
        return 'Test finished.';
    }
};
exports.TestService = TestService;
exports.TestService = TestService = __decorate([
    (0, common_1.Injectable)()
], TestService);
//# sourceMappingURL=test.service.js.map