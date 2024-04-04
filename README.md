<p align="center">
  <center>
    <H1> VSTS Server v0.1.0 </H1>
  </center>
</p>

<p align="center">
  VSTS 잠수함 가상 훈련 시스템 HTTP 서버
</p>

## Description

[Nest](https://github.com/nestjs/nest) 기반 잠수함 가상 훈련 시스템의 http 서버
(c) 한길CNC

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```

## Build

```bash
# production build
$ npm run build
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Hangil CNC](https://www.hangilcnc.com/)

## License

  저작권은 (주)한길씨앤씨에 있습니다.


### 개발 관련 사항

## curl
```sh
curl -X POST -H 'Content-Type: application/json' -d '{"nam":"bb"}' http://192.168.0.7:4000/test
```

## class transform, class validator
```shell
npm install class-validator --save
npm install class-transformer --save
npm install reflect-metadata --save
```
- dto - entity 변환시 dto에 대한 validation은 class validator로 수행 ( https://github.com/typestack/class-validator )
```javascript
export class Post {
  @Length(10, 20)
  title: string;

  // $value, $property - validate할 필드 이름, $targe - validate할 객체,
  // $constraint1,  ... $constraintN - constraints defined by specific validation type
  @MinLength(10, { message: 'Title2 too short. Min length : $constraint1, but actual : $value'})
  @MaxLength(50, { message: 'Title2 too long. Max length : $constraint1 , but actual : $value'})
  title2: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;

  @IsDate()
  createDate: Date;
}
```
- dto가 valid 하다면 규칙에 따라 class transform에 의해 자동으로 entity로 변환되어 ORM에서 사용됨
- entity - dto 변환시 class tramsform에 의해 transform 됨
  - plainToClass 함수
  ```javascript
  ifetch('users.json').then((users: Object[]) => {
    const realUsers = plainToClass(User, users);
    // now each user in realUsers is an instance of User class
  });
  ```
  - classToPlain 함수
  ```javascript
  let photo = classToPlain(photo);
  ```
  - Cloning(instanceToInstance 함수)
  ```javascript
  let photo = instanceToInstance(photo);
  ```

  - 

## Validation Pipe
  - DTO를 이용해 Rest 요청시 자동 DTO validation 진행
  ```javascript
  // in main.ts (bootstrap())
  app.useGlobalPipes(new ValidationPipe());

  // in any controller
  @Post()
  create(@Body() createUserDto: CreateUserDto) { return 'This action adds a new user'; }
  ```
## auth

- 기본 auth 관련 함수들은 src/auth에 정의됨
- auth에서 실제로 체크하는 DB에 관련된 guard 나 정책에 대한 정의는 

## DB 관련

- ORACLE 19에서는 serviceName이 들어가 있어야 접속이 됨
- ORACEL 23에서는 serviceName 없이 database만 있어도 접속이 됐음.
- app.module.ts에서 logging 옵션을 true로 두면 모든 query에 대해 sql을 찍어볼 수 있다.


## Client IP
- request-ip 라이브러리 이용
```javascript
  // req 는 request 객체
  const ip = require('request-ip').getClientIp(req);
```