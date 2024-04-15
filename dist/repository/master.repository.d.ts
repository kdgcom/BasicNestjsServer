import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
export default abstract class MasterRepository<T extends ObjectLiteral> extends Repository<T> {
    constructor(target: EntityTarget<T>, dataSoruce: DataSource);
    doRawQuery(sql: string, params: any, options: any): Promise<any>;
}
