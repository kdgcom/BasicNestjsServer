import { DataSource, QueryRunner } from "typeorm";
export default abstract class MasterRepository {
    protected readonly dataSource: DataSource;
    protected queryRunner: QueryRunner;
    constructor(dataSource: DataSource);
    doRawQuery(sql: any, params: any, options: any): Promise<any>;
}
