import { EntityManager, EntityTarget, ObjectLiteral, QueryRunner, Repository } from "typeorm";
export default abstract class MasterRepository<T extends ObjectLiteral> extends Repository<T> {
    constructor(target: EntityTarget<T>, manager: EntityManager, qr?: QueryRunner);
    doRawQuery(sql: string, params: any, options: any): Promise<any>;
    doRawQueryWithManager(sql: string, params: any, options: any, manager: EntityManager): Promise<any>;
}
