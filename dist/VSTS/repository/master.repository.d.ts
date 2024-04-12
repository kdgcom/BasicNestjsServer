import { DataSource, EntityTarget, QueryRunner, Repository } from "typeorm";
export default abstract class MasterRepository<T> extends Repository<T> {
    queryRunnerBackup: QueryRunner;
    constructor(target: EntityTarget<T>, dataSoruce: DataSource);
    doRawQuery(sql: any, params: any, options: any): Promise<any>;
}
