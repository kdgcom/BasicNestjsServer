/**
 * Status Code 정리
 * 
 * 기본 오류사항 이외의 오류는 460 ~ 499 코드를 사용해 구분한다.
 */

export enum ResponseCode {
  // 200대는 정상 리턴
  OK                     = 200,
  CREATED                = 201,
  ACCEPTED               = 202,
  NO_CONTENT             = 204,

  // 300 대는 redirect

  // 400 이후는 오류
  BAD_REQUEST            = 400,
  UNAUTHORIZED           = 401,   // 로그인 정보가 없음
  FORBIDDEN              = 403,   // 계정이 유효하지 않음
  NOT_FOUND              = 404,
  WRONG_DATA             = 406,
  CONFLICT               = 409,
  ENTITIY_TOO_LONG       = 413,
  UNSUPPORTED_MEDIA_TYPE = 415,
  INTERNAL_SERVER_ERROR  = 500,


  // 이하 특별 케이스의 오류를 추가로 등록해 관리한다.
}

export const ErrorMessage = {
  "204" : "No Content",

  "400" : "Bad Request",
  "401" : "Unauthorized",
  "403" : "Forbidden",
  "404" : "Not Found",
  "406" : "Wrong Data",
  "409" : "Conflict",
  "413" : "Entity Too Long",
  "415" : "Unsupported Media Type",
  "500" : "Internal Server Error",
  
  // 이하 특별 케이스의 오류를 추가로 등록해 관리한다.

}
