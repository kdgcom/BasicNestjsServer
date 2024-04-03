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

## auth

- 기본 auth 관련 함수들은 src/auth에 정의됨
- auth에서 실제로 체크하는 DB에 관련된 guard 나 정책에 대한 정의는 

## DB 관련

- ORACLE 19에서는 serviceName이 들어가 있어야 접속이 됨
- ORACEL 23에서는 serviceName 없이 database만 있어도 접속이 됐음.
- app.module.ts에서 logging 옵션을 true로 두면 모든 query에 대해 sql을 찍어볼 수 있다.