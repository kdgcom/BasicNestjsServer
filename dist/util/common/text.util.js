"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAll = exports.snakeTextToCamel = exports.snakeObjectToCamelObject = exports.snakeToCamel = exports.camelTextToSnake = exports.camelObjectToSnakeObject = exports.camelToSnake = exports.getRandomPassword = exports.generateRandomNum = exports.isNotEmptyBoolan = exports.isString = exports.isEmpty = exports.createUUID = exports.getArrayToString = exports.getStringToArray = exports.getNicknameFromEmail = exports.findDuplicateFieldsFromMany = exports.findDuplicateFields = exports.convertObjectToJsonString = exports.convertStringToJson = void 0;
const uuid_1 = require("uuid");
const log_util_1 = require("../logger/log.util");
function convertStringToJson(value) {
    try {
        if (isEmpty(value))
            return null;
        return JSON.parse(value);
    }
    catch (error) {
        log_util_1.default.warn('<!> Convert string to json error: ', error);
        return null;
    }
}
exports.convertStringToJson = convertStringToJson;
function convertObjectToJsonString(value) {
    try {
        if (isEmpty(value))
            return '';
        return JSON.stringify(value);
    }
    catch (error) {
        log_util_1.default.warn('<!> Convert object to json string error: ', error);
        return '';
    }
}
exports.convertObjectToJsonString = convertObjectToJsonString;
function findDuplicateFields(dtoObject, dbOBject, checkFields) {
    let result = {};
    for (let key in dtoObject) {
        let dupliResult = {
            available: true,
            message: `This ${key} is available.`
        };
        if (!checkFields.includes(key))
            continue;
        if (dbOBject && dtoObject[key] === dbOBject[key]) {
            dupliResult.available = false;
            dupliResult.message = `This ${key} is already being used.`;
        }
        result[key] = dupliResult;
    }
    log_util_1.default.log('Find Duplicated Signup Field...');
    log_util_1.default.log('dtoObject: ', dtoObject, 'dbOBject', dbOBject);
    log_util_1.default.log('result: ', result);
    return result;
}
exports.findDuplicateFields = findDuplicateFields;
function findDuplicateFieldsFromMany(dtoObject, dbOBjects, checkFields) {
    let result = {};
    for (let key in dtoObject) {
        let dupliResult = {
            available: true,
            message: `This ${key} is available.`
        };
        if (!checkFields.includes(key))
            continue;
        if (isEmpty(dbOBjects)) {
            result[key] = dupliResult;
            continue;
        }
        dbOBjects.map(obj => {
            if (dtoObject[key] === obj[key]) {
                dupliResult.available = false;
                dupliResult.message = `This ${key} is already being used.`;
            }
            result[key] = dupliResult;
        });
    }
    log_util_1.default.log('Find Duplicated Signup Field...');
    log_util_1.default.log('dtoObject: ', dtoObject);
    log_util_1.default.log('dbOBjects: ', dbOBjects);
    log_util_1.default.log('result: ', result);
    return result;
}
exports.findDuplicateFieldsFromMany = findDuplicateFieldsFromMany;
function getNicknameFromEmail(email) {
    const finUsername = email?.split('@')[0];
    if (!finUsername)
        return null;
    return finUsername;
}
exports.getNicknameFromEmail = getNicknameFromEmail;
function getStringToArray(bgmsStr) {
    if (!bgmsStr)
        return null;
    return bgmsStr.split(',');
}
exports.getStringToArray = getStringToArray;
function getArrayToString(...args) {
    if (!args)
        return null;
    let result = '';
    args.map(arg => result = result + ',' + arg);
    result = result.slice(1);
    return result;
}
exports.getArrayToString = getArrayToString;
function createUUID() {
    return (0, uuid_1.v4)().replace(/-/gi, '');
}
exports.createUUID = createUUID;
function isEmpty(value) {
    if (isString(value) && value == "") {
        return true;
    }
    else if (value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return true;
    }
    else {
        return false;
    }
}
exports.isEmpty = isEmpty;
;
function isString(value) {
    if (typeof value === "string" || value instanceof String) {
        return true;
    }
    return false;
}
exports.isString = isString;
function isNotEmptyBoolan(value) {
    let valueTostr = value + '';
    if (valueTostr === '0' || valueTostr === '1' || valueTostr === 'true' || valueTostr === 'false') {
        return true;
    }
    return false;
}
exports.isNotEmptyBoolan = isNotEmptyBoolan;
function generateRandomNum(strNum = 0, endNum = 0) {
    let randomNum = strNum + Math.floor(Math.random() * (endNum - strNum + 1));
    return randomNum;
}
exports.generateRandomNum = generateRandomNum;
function getRandomPassword() {
    const pwCollection = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
    ];
    const pwSymbole = ['!', '?', '#', '@'];
    let ranPw = '';
    let randomIndex = 0;
    const PW_LENGTH = 8;
    const PW_COLLECTION_LENGTH = pwCollection.length;
    const PW_SYMBOLE_LENGTH = pwSymbole.length;
    for (let i = 0; i < PW_LENGTH; i++) {
        randomIndex = Math.floor(generateRandomNum(0, PW_COLLECTION_LENGTH - 1));
        ranPw += pwCollection[randomIndex];
    }
    let numRe = ranPw[generateRandomNum(1, PW_LENGTH - 1)];
    ranPw = ranPw.replace(numRe, generateRandomNum(0, 9) + '');
    randomIndex = Math.floor(generateRandomNum(0, PW_SYMBOLE_LENGTH - 1));
    ranPw += pwSymbole[randomIndex];
    return ranPw;
}
exports.getRandomPassword = getRandomPassword;
function camelToSnake(data, upper = true) {
    log_util_1.default.log('start camelToSnake...');
    let result = null;
    if (isEmpty(data)) {
        log_util_1.default.log('Data isEmpty... End camelToSnake...');
        return data;
    }
    if (Array.isArray(data)) {
        result = [];
        data.forEach(item => {
            item = camelObjectToSnakeObject(item, upper);
            result.push(item);
        });
    }
    else {
        result = camelObjectToSnakeObject(data, upper);
    }
    log_util_1.default.log('End camelToSnake...');
    return result;
}
exports.camelToSnake = camelToSnake;
function camelObjectToSnakeObject(obj, upper = true) {
    let result = {};
    Object.keys(obj).forEach(key => {
        let _key = camelTextToSnake(key, upper);
        result[_key] = obj[key];
        _key = null;
    });
    return result;
}
exports.camelObjectToSnakeObject = camelObjectToSnakeObject;
function camelTextToSnake(text, upper = true) {
    if (!text)
        return;
    if (upper) {
        return text.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
    }
    else {
        return text.replace(/[A-Z]/g, letter => `_${letter}`).toLowerCase();
    }
}
exports.camelTextToSnake = camelTextToSnake;
function snakeToCamel(data, useDataType = true) {
    log_util_1.default.log('start snakeToCamel...', data);
    let result;
    if (isEmpty(data)) {
        return data;
    }
    if (data && Array.isArray(data)) {
        result = [];
        data.forEach(item => {
            item = snakeObjectToCamelObject(item);
            result.push(item);
        });
    }
    else {
        result = snakeObjectToCamelObject(data);
    }
    return result;
}
exports.snakeToCamel = snakeToCamel;
function snakeObjectToCamelObject(obj, useDataType = true) {
    let result = {};
    if (obj) {
        Object.keys(obj).forEach(key => {
            let _key = snakeTextToCamel(key, useDataType);
            result[_key] = obj[key];
        });
    }
    return result;
}
exports.snakeObjectToCamelObject = snakeObjectToCamelObject;
const dataTypeRoles = ['b', 'c', 'd', 'n', 's', 't', 'f'];
function snakeTextToCamel(text, useDataType = true) {
    if (!text)
        return;
    let dataTypeReg = /^[bcdnstf][A-Z]/g;
    let isUseDataType = text.match(dataTypeReg);
    let typeFlag = text[0];
    if (isEmpty(isUseDataType))
        return text;
    text = text.substring(1);
    text = text.replace(dataTypeReg, g => g[1]);
    let result = text.toLowerCase().replace(/([-_]\w)/g, g => g[1].toUpperCase());
    if (typeFlag === 'd') {
        result += "Date";
    }
    return result;
}
exports.snakeTextToCamel = snakeTextToCamel;
function replaceAll(str, searchText, replaceText) {
    return str.replace(`/${searchText}/gi`, replaceText);
}
exports.replaceAll = replaceAll;
//# sourceMappingURL=text.util.js.map