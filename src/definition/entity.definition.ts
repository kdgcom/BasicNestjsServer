import { snakeObjectToCamelObject } from "src/util/common/text.util";
import { Entity } from "typeorm";

export default class EntityDefinition 
{
    public toPlain(): any
    {
        const ret = snakeObjectToCamelObject(this);

        return ret;
    }
}