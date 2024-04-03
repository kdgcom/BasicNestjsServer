"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConstModule = void 0;
const common_1 = require("@nestjs/common");
const MyConst_1 = require("./MyConst");
let ConstModule = class ConstModule {
};
exports.ConstModule = ConstModule;
exports.ConstModule = ConstModule = __decorate([
    (0, common_1.Module)({
        imports: [MyConst_1.MyConst],
        controllers: [],
        providers: [],
    })
], ConstModule);
//# sourceMappingURL=const.module.js.map