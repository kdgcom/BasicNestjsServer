"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const MyConst_1 = require("./const/MyConst");
const log_util_1 = require("./util/logger/log.util");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: process.env.NODE_ENV === 'production'
            ? ['error', 'warn', 'log']
            : ['error', 'warn', 'log', 'verbose', 'debug']
    });
    const port = process.env.LISTEN_PORT || MyConst_1.MyConst.LISTEN_PORT;
    await app.listen(port, () => {
        log_util_1.default.info("LISTEN port : ", port);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map