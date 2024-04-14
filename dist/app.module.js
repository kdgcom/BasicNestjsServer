"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const const_module_1 = require("./const/const.module");
const typeorm_1 = require("@nestjs/typeorm");
const log_util_1 = __importDefault(require("./util/logger/log.util"));
const config_1 = require("@nestjs/config");
const typeorm_2 = require("typeorm");
const member_entity_1 = require("./auth/entity/member.entity");
const VSTS_module_1 = require("./VSTS/VSTS.module");
const reqres_logger_mw_1 = require("./middleware/reqres_logger.mw");
const test_service_1 = require("./test.service");
const test_controller_1 = require("./test.controller");
const get_db_options = () => {
    const db_options = {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        serviceName: process.env.DB_DATABASE,
        username: process.env.DB_USER,
        password: process.env.DB_PW,
        entities: [member_entity_1.MemberEntity],
        dropSchema: false,
        synchronize: false,
        keepConnectionAlive: true,
        logging: true,
    };
    log_util_1.default.debug("DB Options : ", db_options);
    return db_options;
};
const imports = [
    config_1.ConfigModule.forRoot({
        isGlobal: true
    }),
    auth_module_1.AuthModule,
    const_module_1.ConstModule,
    VSTS_module_1.VSTSModule,
    typeorm_1.TypeOrmModule.forRootAsync({
        name: 'default',
        type: 'db',
        useFactory: async () => {
            return get_db_options();
        },
    })
];
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    configure(consumer) {
        consumer
            .apply(reqres_logger_mw_1.ReqResLoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports,
        controllers: [app_controller_1.AppController, test_controller_1.TestController],
        providers: [app_service_1.AppService, test_service_1.TestService],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
//# sourceMappingURL=app.module.js.map