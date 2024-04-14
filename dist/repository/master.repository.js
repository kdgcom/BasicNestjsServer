"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_util_1 = __importDefault(require("../util/logger/log.util"));
const basicException_1 = __importDefault(require("../util/response/basicException"));
const responseCode_1 = require("../util/response/responseCode");
const typeorm_1 = require("typeorm");
class MasterRepository extends typeorm_1.Repository {
    constructor(target, dataSoruce) {
        super(target, dataSoruce.createEntityManager(), dataSoruce.createQueryRunner());
    }
    async doRawQuery(sql, params, options) {
        log_util_1.default.log("doRawQuery : ", sql, params, options);
        const connection = this.queryRunner.connection;
        if (!connection) {
            log_util_1.default.error("Cannot get DB Connection.");
            throw new basicException_1.default(responseCode_1.ResponseCode.INTERNAL_SERVER_ERROR);
        }
        const [query, parameters] = connection.driver.escapeQueryWithParameters(sql, params, options);
        return this.queryRunner.manager.query(query, parameters);
    }
}
exports.default = MasterRepository;
//# sourceMappingURL=master.repository.js.map