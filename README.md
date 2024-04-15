<p align="center">
  <center>
    <H1> VSTS Server v0.1.0 </H1>
  </center>
</p>

<p align="center">
  VSTS 잠수함 가상 훈련 시스템 Rest API 서버
</p>

<style>
red { color: Red }
orange { color: Orange }
green { color: Green }
blue { color: Blue }
pink { color: Pink }
magenta { color: Magenta }
cyan { color: Cyan }
yellow { color: Yellow }
</style>

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

<br>
<p align="center">
<center>
<H2>개발 관련 사항</H2>
</center>
</p>

## curl
```sh
# sample
+ curl -X POST -H 'Content-Type: application/json' -d '{"name":"bb"}' http://192.168.0.7:4000/test
# login
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!!"}' http://192.168.0.7:4000/auth/signin
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!"}' http://192.168.0.7:4000/auth/signin
# refresh token
curl -X POST -H 'Content-Type: application/json' --cookie "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaF90b2tlbiIsImlhdCI6MTcxMjg5ODkyOCwiZXhwIjoxNzEyODk4OTg4fQ.VurKRhFVNTqTtrAaE-Yd6DHcxMlNGDZg9FTcZv-kROU" http://192.168.0.7:4000/auth/regenerate

# Get user by armycode
curl -X GET http://192.168.0.7:4000/auth/user/00-00000
curl -X GET http://192.168.0.7:4000/auth/user2/00-00000
# update member info
curl -X PATCH -H 'Content-Type: application/json' -d '{"armyCode":"00-00000", "passwd":"qwer1234!"}' http://192.168.0.7:4000/auth/user
#
```

## .env 사용
- .env.xx 파일 사용
  * env-cmd
  ```sh
  npx env-cmd -f .env.xx <나머지 실행 명령>

  # example
  npx env-cmd -f .env.local nest start --watch
  ```

## class transform, class validator
```shell
npm install class-validator --save
npm install class-transformer --save
npm install reflect-metadata --save
```
- entity 정의 : EntityDefinition을 extend - toPlain() 함수가 들어 있음
```javascript
@Entity('T_MEMBER')
export class MemberEntity extends EntityDefinition
{
  @PrimaryColumn() // auto generated number일 경우 PrimaryGeneratedColumn
  sID: string;

  @Column()
  sNAME: string;
}

```
- dto - entity 변환시 dto에 대한 validation은 class validator로 수행 ( https://github.com/typestack/class-validator )
```javascript
export class PostDTO {
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
- dto가 valid 하다면 필요에 따라 DTO class 안에 toEntity 함수를 정의해 Entity로 전환한다.
  - DTO내 함수 정의
  ```javascript
  // DTODefinition은 DTO 선언용 추상 함수. toEntity를 구현해 줘야 함.
  export class PostDTO extends DTODefinition {
    toEntity(): PostEntity
    {
      const pe = new PostEntity();
      if ( this.nID ) pe.nID = this.nID;    // update할 때 필요 없는 필드를 넣지 않기 위함
      ...

      return pe;
    }
  }
  ```
- class tramsform으로 json - class object간 변환
  - plainToClass 함수 (nestjs에서 외부 API를 콜하고 json형태로 받은 답을 object로 변환할 때 사용)
  ```javascript
  ifetch('users.json').then((users: Object[]) => {
    const realUsers = plainToClass(User, users);
    // now each user in realUsers is an instance of User class
  });
  ```
  - classToPlain 함수 (내부 클래스를 외부로 전달할 json으로 전환할 때 새용)
  ```javascript
  let photo = classToPlain(photo);
  ```
  - Cloning(instanceToInstance 함수)
  ```javascript
  let photo = instanceToInstance(photo);
  ```

  - 

## DB 기본 세팅(mysql)
- 
## DB query 관련
- update
  - repository.update는 인수로 ({where에 들어갈 변수를 위한 json}, object) 형태로 넣어야 함
  ```typescript
  ```
  - 
- transaction - (MemberRepository의 update함수 참조)
  * 참고 링크 ([typeorm - manager](https://orkhan.gitbook.io/typeorm/docs/entity-manager-api))
```javascript
// transaction START
// connection을 새로 받음
const newQR = await this.dataSource.createQueryRunner();
await newQR.connect();
await newQR.startTransaction();
try
{
    // 두가지 옵션이 있음
    // 1. transaction은 insert와 update, delete에 대해서만 일어남
    await newQR.manager.getRepository(ENTITY1).save(INSTANT_OF_AN_ENTITY);
    await newQR.manager.save(ENTITY1, { /*data1*/ })
    await newQR.manager.insert(ENTITY2, { /*data2*/ })
    await newQR.manager.createQueryBuilder(). ...
    await newQR.manager.remove(INSTANCE_OF_AN_ENTITY); // 즉, User가 아니라 user
    await newQR.manager.remove([instance1, instance2, instance3]);
    await newQR.manager.delete(ID);
    await newQR.manager.delete({ /*condition*/});
    await newQR.manager.update(User, {age: 18 }, { category: "ADULT" });
    await newQR.manager.update(User, 1, { firstName: "Rizzrak" }); // id==1인 raw에 대해 udpate


    // 2. manager.withRepository 함수 이용 --> 특정 repository에 정의된 함수 이용 가능
    newQR.manager.withRepository(this.repository).FUNCTION_NAME()
    // this.setQueryRunner(newQR);
    // await this.repository.update(where, entity);

    // 3. raw query 이용
    await newQR.manager.query("RAW QUERY");
    
    // 모두 성공했다면 commit
    await newQR.commitTransaction();
}
catch(e)
{
    // 실패시 롤백
    await newQR.rollbackTransaction();
}
finally
{
    await newQR.release();
}
// transaction END
```
- insert시 시퀀스 넘버 필드 auto_increment
  - oracle의 경우 sequence를 이용해 auto_increment 설정
  ```sql
  CREATE SEQUENCE temp_seq START WITH 1 INCREMENT BY 1 NOCACHE;

  INSERT INTO T_MEMBER (id, str) values(tmp_seq.NEXTVAL, 'tmptmp');

  ```

## Validation Pipe
  - DTO를 이용해 Rest 요청이 들어올 때 자동 DTO validation 진행
  - main.ts에서 global pipe를 세팅하고
  ```javascript
  // in main.ts (bootstrap())
  app.useGlobalPipes(new ValidationPipe());
  ```

  - 컨트롤러에서는 json형태의 인수를 받을 때 DTO형태로 미리 정의해둔 형태로 json을 받는다.
  ```javascript
  // in any controller
  @Post()
  create(@Body() createUserDto: CreateUserDto) { return 'This action adds a new user'; }
  ```
  - 요건에 맞지 않으면 로직에 들어가지 않고 바로 리턴시킨다.
## auth

- 기본 auth 관련 함수들은 src/auth에 정의됨
- auth에서 실제로 체크하는 DB에 관련된 guard 나 정책에 대한 정의는 src/auth/아래에 guard, dto, entity 등에 정의됨
- auth 기본 개념
  * Authorization은 기본적으로 JWT 형식의 access_token(AT)을 통해 이뤄짐
    + req header에서 "Authorization Bearer <access_token> "
  * access_token의 exp time은 짧으므로 (1일 이하) 이후 자동으로 로그인되도록 하기 위해서는 refresh_token(RT)을 사용
  * refresh_token(RT) - AT의 재발행시 권한 체크용
    + 발행
      - <magenta>시점 1</magenta> : 최초 로그인시 AT이 return될 때 발행
      - <magenta>시점 2</magenta> : AT이 만료되어 RT을 이용해 AT를 재발할 때 RT도 다시 재발행
      - cookie에 set하는 방식으로 발행. httpOnly, secure를 이용하여 외부의 접근을 불허
    + <orange>RT를 이용한 AT의 재발급 과정</orange>
      - 만료된 AT를 이용한 api요청이 들어온다. (c-->s)
      - Unauthorized 오류가 리턴된다. (s-->c)
      - 클라이언트는 자동으로 RT를 cookie에 태워 재발급 API를 요청한다. (c-->s)
      - 서버는 새 AT와 새 RT를 발급해 AT는 data로, RT는 쿠키에 set하여 답변한다. ( s-->c )
      - 이후 클라는 새 AT를 이용해 API통신
    + <orange>재발급을 위한 클라이언트의 의무</orange>
      - auth gruard가 세팅된 API 요청시 (즉 AT가 필요한 요청) 모든 요청 정보를 모아 어딘가에 저장
        * 저장 정보 : method, url, data, param, callback, fail callback등 통신을 위한 정보 일체
        * localStorage나 SPA일 경우 내부 변수 등에 저장
        * AT를 재발급 받은 후 다시 API를 수행하고 콜백을 실행해야 하기 때문.
      - AT가 재발급 되고 나면 저장해 둔 정보에 기반해 API call을 재수행
  * <u>RT를 이용한 AT 재발행의 의무가 AT에게 있는 이유</u>
    + 여러 목적의 API를 같은 AT를 통해 사용할 때 모든 API가 auth권한이 있는건 아니기 때문
    + AT가 만료되면 클라이언트는 auth가 가능한 API에 RT를 이용하여 AT를 취득


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

## nestia 사용
- swagger 사용을 위함
- 

## 문법 오류 처리

- json 설정시 Element implicitly has an 'any' type because expression of type SOMETHING can't be used to index type
  * key의 경우 type이 any라면 못받는 경우가 생김.
```typescript
const __errors: Record<string|number, any> = {};
```

- 일반 plain object일 경우 선언시 :any를 붙일것
```typescript
const where: any = {};
where[SOMETHING] = xxx;
```