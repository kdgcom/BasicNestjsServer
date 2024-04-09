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

<br>
<p align="center">
<center>
<H2>개발 관련 사항</H2>
</center>
</p>

## curl
```sh
+ curl -X POST -H 'Content-Type: application/json' -d '{"name":"bb"}' http://192.168.0.7:4000/test
# login
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!!"}' http://192.168.0.7:4000/auth/signin
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!"}' http://192.168.0.7:4000/auth/signin
# Get user by armycode
curl -X GET http://192.168.0.7:4000/auth/user/00-00000
curl -X GET http://192.168.0.7:4000/auth/user2/00-00000
# update member info
curl -X PATCH -H 'Content-Type: application/json' -d '{"armyCode":"00-00000", "passwd":"qwer1234!"}' http://192.168.0.7:4000/auth/user
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

## DB query 관련
- update
  - repository.update는 인수로 ({where에 들어갈 변수를 위한 json}, object) 형태로 넣어야 함
  ```typescript
  ```
  - 

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