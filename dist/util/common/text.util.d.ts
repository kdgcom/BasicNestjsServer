export declare function convertStringToJson(value: any): any;
export declare function convertObjectToJsonString(value: any): string;
export declare function findDuplicateFields(dtoObject: any, dbOBject: any, checkFields: string[]): {};
export declare function findDuplicateFieldsFromMany(dtoObject: any, dbOBjects: any[], checkFields: string[]): {};
export declare function getNicknameFromEmail(email: string): string;
export declare function getStringToArray(bgmsStr: any): any;
export declare function getArrayToString(...args: any[]): string;
export declare function createUUID(): string;
export declare function isEmpty(value: any): boolean;
export declare function isString(value: any): boolean;
export declare function isNotEmptyBoolan(value: any): boolean;
export declare function generateRandomNum(strNum?: number, endNum?: number): number;
export declare function getRandomPassword(): string;
export declare function passwordEncrypt(passwd: any): any;
export declare function passwordCompare(inPassword: any, passwordHash: any): any;
export declare function camelToSnake(data: Object | Object[], upper?: boolean): any;
export declare function camelObjectToSnakeObject(obj: Object, upper?: boolean): {};
export declare function camelTextToSnake(text: string, upper?: boolean): string | null;
export declare function snakeToCamel(data: any, useDataType?: boolean): any;
export declare function snakeObjectToCamelObject(obj: Object, useDataType?: boolean): {};
export declare function snakeTextToCamel(text: string, useDataType?: boolean): string;
export declare function replaceAll(str: string, searchText: string, replaceText: string): string;
