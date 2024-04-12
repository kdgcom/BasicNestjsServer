import _l from "src/util/logger/log.util";
import BasicException from "src/util/response/basicException";
import { ResponseCode } from "src/util/response/responseCode";
import { DataSource, EntityTarget, QueryRunner, Repository, getConnection } from "typeorm";

/**
 * T 는 특정 table의 Entity를 칭하는 template임.
 */
export default abstract class MasterRepository<T> extends Repository<T>
{
    // protected queryRunner: QueryRunner;
    public queryRunnerBackup: QueryRunner;
    // protected dataSource: DataSource;

    constructor(target: EntityTarget<T>, dataSoruce: DataSource)
    // constructor(protected readonly dataSource: DataSource)
    {
        super(
            target, 
            dataSoruce.createEntityManager(), 
            dataSoruce.createQueryRunner()
        );
        // this.queryRunner = this.dataSource.createQueryRunner();
    }

    /**
     * transaction을 이용하기 위해 Repository의 Runner를 바꾸는 용도
     * @param qr 
     */
    // public setQueryRunner(qr)
    // {
    //     this.queryRunnerBackup = this.queryRunner;
    //     this.queryRunner = qr;
    // }

    /**
     * transaction을 이용하기 위해 바꾼 Runner를 되돌리는
     */
    // public returnOriginalQueryRunner()
    // {
    //     if ( this.queryRunnerBackup )
    //     {
    //         this.queryRunner = this.queryRunnerBackup;
    //         this.queryRunnerBackup = null;
    //     }
    // }

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