import _l from "src/util/logger/log.util";
import BasicException from "src/util/response/basicException";
import { ResponseCode } from "src/util/response/responseCode";
import { DataSource, QueryRunner, Repository, getConnection } from "typeorm";

/**
 * T 는 특정 table의 Entity를 칭하는 template임.
 */
export default abstract class MasterRepository
{
    protected queryRunner: QueryRunner;
    // protected dataSource: DataSource;

    constructor(protected readonly dataSource: DataSource)
    {
        this.queryRunner = this.dataSource.createQueryRunner();
    }

    /**
     * escape가 가능한 raw sql query 실행
     * 
     * @param sql       raw sql
     * @param params    parameters in sql which will be esacaped 
     * @param options 
     * @returns 
     */
    public async doRawQuery(sql, params, options): Promise<any>
    {
        _l.log("doRawQuery : ", sql, params, options);
        // const connection = getConnection() || this.queryRunner.connection;
        const connection = this.queryRunner.connection;
        if ( !connection )
        {
            _l.error("Cannot get DB Connection.");
            throw new BasicException(ResponseCode.INTERNAL_SERVER_ERROR);
        }
        const [query, parameters] = connection.driver.escapeQueryWithParameters(sql, params, options);
        return this.queryRunner.manager.query(query, parameters);
    }
}