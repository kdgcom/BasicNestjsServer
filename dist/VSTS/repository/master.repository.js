"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log_util_1 = require("../../util/logger/log.util");
const basicException_1 = require("../../util/response/basicException");
const responseCode_1 = require("../../util/response/responseCode");
class MasterRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.queryRunner = this.dataSource.createQueryRunner();
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