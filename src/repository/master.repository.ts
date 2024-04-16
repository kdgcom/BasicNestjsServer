import _l from "src/util/logger/log.util";
import BasicException from "src/util/response/basicException";
import { ResponseCode } from "src/util/response/responseCode";
import { DataSource, EntityManager, EntityTarget, ObjectLiteral, QueryRunner, Repository, getConnection } from "typeorm";

/**
 * T 는 특정 table의 Entity를 칭하는 template임.
 */
export default abstract class MasterRepository<T extends ObjectLiteral> extends Repository<T>
{
    // protected queryRunner: QueryRunner;
    // public queryRunnerBackup: QueryRunner;
    // protected dataSource: DataSource;

    // constructor(target: EntityTarget<T>, dataSource: DataSource)
    // {
    //     super(
    //         target,
    //         dataSource.createEntityManager()
    //     );
    // }

    constructor(target: EntityTarget<T>, manager: EntityManager, qr?: QueryRunner)
    {
        super(
            target,
            manager,
            qr
        );
    }

    /**
     * escape가 가능한 raw sql query 실행
     * 
     * @param sql       raw sql
     * @param params    parameters in sql which will be esacaped 
     * @param options 
     * @returns 
     */
    public async doRawQuery(sql: string, params: any, options: any): Promise<any>
    {
        // let qr: QueryRunner | undefined = this.queryRunner;
        // if ( !qr )
        // {
        //     qr = this.manager.queryRunner;
        //    // throw new BasicException(ResponseCode.INTERNAL_SERVER_ERROR, `No query runner: doRawQuery(${sql})`);
        // }

        // _l.log("doRawQuery : ", sql, params, options);
        // // const connection = getConnection() || this.queryRunner.connection;
        // const connection = qr?.connection || this.manager.connection;
        // if ( !connection )
        // {
        //     _l.error("Cannot get DB Connection.");
        //     throw new BasicException(ResponseCode.INTERNAL_SERVER_ERROR);
        // }
        // const [query, parameters] = connection.driver.escapeQueryWithParameters(sql, params, options);
        // return await this.manager.query(query, parameters);

        return await this.doRawQueryWithManager(sql, params, options, this.manager);
    }

    public async doRawQueryWithManager(sql: string, params: any, options: any, manager: EntityManager): Promise<any>
    {
        _l.log("doRawQuery : ", sql, params, options);
        // const connection = getConnection() || this.queryRunner.connection;
        const connection = manager.connection;
        if ( !connection )
        {
            _l.error("Cannot get DB Connection.");
            throw new BasicException(ResponseCode.INTERNAL_SERVER_ERROR);
        }
        const [query, parameters] = connection.driver.escapeQueryWithParameters(sql, params, options);
        return await manager.query(query, parameters);
    }
}