/**
 * @file          text(string) 관련 함수 모음
 */

import { v4 as uuidv4 } from 'uuid';
import _l from '../logger/log.util';
import BasicException from '../../lib/definition/response/basicException';
import { ResponseCode } from '../../lib/definition/response/responseCode';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';


export function convertStringToJson(value: any): any {
  try {
    if (isEmpty(value)) return null;
    return JSON.parse(value)
  } catch (error) {
    _l.warn('<!> Convert string to json error: ', error);
    return null;
  }
}

export function convertObjectToJsonString(value: any): string {
  try {
    if (isEmpty(value)) return '';
    return JSON.stringify(value)
  } catch (error) {
    _l.warn('<!> Convert object to json string error: ', error);
    return '';
  }
}

/**
 * 두개의 오브젝트를 비교해 중복된 필드를 찾는다.
 * @param {any}       dtoObject     기준이 될 오브젝트
 * @param {any}       dbOBject      비교 대상 오브젝트
 * @param {string[]}  checkFields   체크할 키 값 
 * @returns 
 */
export function findDuplicateFields(dtoObject: any, dbOBject: any, checkFields: string[]) {
  let result: any = {};
  for (let key in dtoObject) {
    let dupliResult = {
      available: true,
      message: `This ${key} is available.`
    }
    if (!checkFields.includes(key)) continue;
    if (dbOBject && dtoObject[key] === dbOBject[key]) {
      dupliResult.available = false;
      dupliResult.message = `This ${key} is already being used.`
    }
    result[key] = dupliResult
  }
  _l.log('Find Duplicated Signup Field...')
  _l.log('dtoObject: ', dtoObject, 'dbOBject', dbOBject);
  _l.log('result: ', result)
  return result
}


/**
 * 
 * @param dtoObject 
 * @param dbOBjects 
 * @param checkFields 
 * @returns 
 */
export function findDuplicateFieldsFromMany(dtoObject: any, dbOBjects: any[], checkFields: string[]) {
  let result: any = {};
  for (let key in dtoObject) {
    let dupliResult = {
      available: true,
      message: `This ${key} is available.`
    }
    if (!checkFields.includes(key)) continue;
    if(isEmpty(dbOBjects)) {
      result[key] = dupliResult;
       continue;
    }
    dbOBjects.map( obj => {
      if(dtoObject[key] === obj[key]) {
        dupliResult.available = false;
        dupliResult.message = `This ${key} is already being used.`
      }
      result[key] = dupliResult
    })
  }
  _l.log('Find Duplicated Signup Field...')
  _l.log('dtoObject: ', dtoObject);
  _l.log('dbOBjects: ', dbOBjects);
  _l.log('result: ', result)
  return result
}



export function getNicknameFromEmail(email: string) {
  const finUsername = email?.split('@')[0];
  if(!finUsername) return null;
  return finUsername
}

/**
 * ','로 구분된 문자열을 배열로 가져오기
 * @param bgmsStr 
 * @returns 
 */
export function getStringToArray (bgmsStr: string | undefined) {
  if(!bgmsStr) return null
  return bgmsStr.split(',').map(i=>i.trim());
}

/**
 * 배열을 ','로 구분한 문자열로 만들기
 * @param args 
 * @returns 
 */
export function getArrayToString (...args: any[]) {
  if(!args) return null
  let result = '';
  args.map( arg => result = result + ',' + arg )
  result = result.slice(1)
  return result
}

/**
 * 
 * @returns 
 */
export function createUUID(): string {
  return uuidv4().replace(/-/gi, '');
}

/**
 * 유효한 값이 있는지 판단 
 * {}, [], '', null, undefined 모두 false
 * @param value 판단하고 싶은 값
 * @returns     {boolean}
 */
export function isEmpty(value: any): boolean {
  if(isString(value) && value == "") {
    return true
  } else if ( value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
    return true
  } else {
    return false
  }
};

export function isString(value: any): boolean {
  if(typeof value === "string" || value instanceof String){
    return true
  }
  return false
}

/**
 * null undefined값이 아닌 true, false, 0, 1 만 true 리턴
 * @param value 
 */
export function isNotEmptyBoolan(value: any) {
  let valueTostr = value + '';
  if(valueTostr === '0' || valueTostr === '1' ||  valueTostr === 'true' || valueTostr === 'false') {
    return true
  }
  return false
}

export function generateRandomNum(strNum = 0, endNum = 0) {
  let randomNum = strNum + Math.floor(Math.random() * (endNum - strNum + 1));
  return randomNum
}

/**
 * 무작위 비밀번호 생성
 */
export function getRandomPassword() {
  const pwCollection = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ]
  // ! @ # $ 
  const pwSymbole = ['!', '?', '#', '@'];

  let ranPw = '';
  let randomIndex = 0;
  const PW_LENGTH = 8;
  const PW_COLLECTION_LENGTH = pwCollection.length
  const PW_SYMBOLE_LENGTH = pwSymbole.length

  for (let i = 0; i < PW_LENGTH; i++) {
    randomIndex = Math.floor(generateRandomNum(0, PW_COLLECTION_LENGTH - 1));
    ranPw += pwCollection[randomIndex];
  }

  let numRe = ranPw[generateRandomNum(1, PW_LENGTH - 1)]
  ranPw = ranPw.replace(numRe, generateRandomNum(0, 9) + '')

  randomIndex = Math.floor(generateRandomNum(0, PW_SYMBOLE_LENGTH - 1));
  ranPw += pwSymbole[randomIndex];

  return ranPw
}

/**
 * password를 bcrypt를 이용해 hash로 변환한다.
 * 
 * @param passwd plain password
 */
export async function passwordEncrypt(passwd: string)
{
  const saltRounds: number = parseInt(process.env.PW_SALT_NROUND || '10');

  const salt = await genSaltSync(saltRounds);
  const hash = await hashSync( passwd, salt );

  return hash;
}

/**
 * 유저 로그인시 패스워드가 맞는지 체크
 * 
 * @param inPassword 로그인시 입력 받은 패스워드
 * @param passwordHash DB에 저장된 패스워드 해쉬
 * @returns 
 */
export async function passwordCompare(inPassword: string, passwordHash: string)
{
  _l.info("Password Compare : ", inPassword, passwordHash);
  return await compareSync(inPassword, passwordHash);
}


/**
 * 카멜 형식의 데이터를 snake 형식 데이터로 바꿔줌
 * memId => MEM_ID
 * @param data  {Object||Object[]}
 * @param upper {boolean}
 * @returns snake 형식 데이터
 */
export function camelToSnake(data: Object | Object[], upper: boolean = true) {
  _l.log('start camelToSnake...')
  let result = null;
  if (isEmpty(data)) {
    _l.log('Data isEmpty... End camelToSnake...')
    return data;
  }
  if (Array.isArray(data)) {
    result = [];
    data.forEach(item => {
      item = camelObjectToSnakeObject(item, upper)
      result.push(item)
    })
  } else {
    result = camelObjectToSnakeObject(data, upper)
  }

  _l.log('End camelToSnake...')
  return result
}


/**
 * Object의 key 값을 snake 형식으로 바꿔줌
 * @param obj   {Object}
 * @param upper {boolean}
 * @returns     {Object} snake 형식의 key 값을 갖는 오브젝트
 */
export function camelObjectToSnakeObject(obj: Object, upper: boolean = true) {
  let result: any = {};
  Object.keys(obj).forEach(key => {
    let _key = camelTextToSnake(key, upper) || null;
    if ( _key )
      result[_key] = obj[key as keyof typeof obj];
    _key = null;
  });
  return result;
}



/**
 * camel식 string을 snake 형식으로 바꿔준다.
 * 대문자를 기준으로 언더바(_)가 생긴다.
 * 예) pivotArtwork -> PIVOT_ARTWORK 
 * @param text  snake 형식으로 바꿀 텍스트
 * @param upper snake 형식을 바꿀때, 모두 대문자로 할지 여부
 * @returns {string|null}
 */
export function camelTextToSnake(text: string, upper: boolean = true): string | null {
  if (!text) return null;
  if (upper) {
    return text.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();
  } else {
    return text.replace(/[A-Z]/g, letter => `_${letter}`).toLowerCase();
  }
}



/**
 * snake 규칙을 따르는 데이터, cammel 식으로 변환
 * @param data          배열 또는 오브젝트
 * @param useDataType   데이터 타입 명시하는지 여부 (기본 true)
 * @returns 
 */
export function snakeToCamel(data: Object|[], useDataType = true) {
  _l.log('start snakeToCamel...', data)
  let result;
  if (isEmpty(data)) {
    // _l.log('end snakeToCamel...')
    return data;
  }

  if (data && Array.isArray(data)) {
    result = [];
    data.forEach(item => {
      item = snakeObjectToCamelObject(item)
      result.push(item)
    })
  } else {
    result = snakeObjectToCamelObject(data)
  }

  // _l.log('end snakeToCamel...')
  return result
}

/**
 * snake 규칙을 따르는 Object 객체, camel 식으로 변환
 * @param obj 
 * @param useDataType  데이터 타입 명시하는지 여부 (기본 true)
 * @returns camel 규칙 오브젝트
 */
export function snakeObjectToCamelObject(obj: Object, useDataType: boolean = true) {
  let result: Record<string|number, any> = {}
  if (obj) {
    Object.keys(obj).forEach(key => {
      let _key:string | null = snakeTextToCamel(key, useDataType) || null;
      if ( _key )
        result[_key] = obj[key as keyof typeof obj];
    });
  }
  return result;
}



const dataTypeRoles = ['b', 'c', 'd', 'n', 's', 't', 'f']
/**
 * snake 규칙의 string을 camel 형식으로 바꿔줌
 * 예) useDataType가 true 일 경우
 * nMEM_ID -> memId
 * @param text          변수명
 * @param useDataType   데이터 타입 명시하는지 여부
 * @returns nMEM_ID => memId
 */
export function snakeTextToCamel(text: string, useDataType: boolean = true) {
  if (!text) return;
  let dataTypeReg = /^[bcdnstf][A-Z]/g
  let isUseDataType = text.match(dataTypeReg)
  let typeFlag = text[0]
  // console.log('isUseDataType? ', isUseDataType)
  // console.log('typeFlag? ', typeFlag)


  if (isEmpty(isUseDataType))
    return text;

  text = text.substring(1);
  text = text.replace(dataTypeReg, g => g[1]);
  // ID는 대문자로 출력되도록 한다.
  text = text.replace(/_ID$/, "_I_D");
  let result = text.toLowerCase().replace(/([-_]\w)/g, g => g[1].toUpperCase())

  if (typeFlag === 'd') {
    result += "Date"
  }

  return result
}


export function replaceAll(str: string, searchText: string, replaceText: string) {
  return str.replace(`/${searchText}/gi`, replaceText);
}

/**
 * url에서 확장자만 추려내는 함수
 * @param _url 
 * @returns 
 */
export function getURLExtension(_url: string): string
{
  let url=_url;
  try
  {
    url = new URL(_url).pathname;
  }
  catch(e) // url로 변환하지 적합하지 않다면 이미 url의 pathname일 수 있음
  {
    url = _url;
  }
  let file = url.split('/').pop();
  const ext: string[] = (file || "")?.split('.');
  return ext.length>1?(ext.pop() || ""):"";
}

export function isURLMediaFile( _url: string): boolean
{
  try
  {
    const ext = getURLExtension(_url);
    switch(ext?.toLowerCase())
    {
      case 'jpg':
      case 'jpeg':
      case 'webp':
      case 'png':
      case 'js':
      case 'html':
      case 'mp4':
      case 'mkv':
      case 'mpeg':
      case 'gif':
      case 'ico':
      case 'css':
        return true;
      default:
        return false;
    }

  }
  catch(e)
  {
    _l.debug(e);

  }
  return false;
}