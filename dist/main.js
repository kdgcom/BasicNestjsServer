"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const MyConst_1 = require("./const/MyConst");
const log_util_1 = __importDefault(require("./util/logger/log.util"));
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.NODE_ENV === 'production'
            ? ['error', 'warn', 'log']
            : ['error', 'warn', 'log', 'verbose', 'debug']
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        disableErrorMessages: false,
        exceptionFactory: (validationErrors = []) => {
            log_util_1.default.error("** ValidationError : ", JSON.stringify(validationErrors));
            return new common_1.BadRequestException(validationErrors);
        },
    }));
    app.use((0, cookie_parser_1.default)());
    const port = MyConst_1.MyConst.LISTEN_PORT = process.env.LISTEN_PORT || MyConst_1.MyConst.LISTEN_PORT;
    await app.listen(port, () => {
        log_util_1.default.info("LISTEN port : ", port);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map