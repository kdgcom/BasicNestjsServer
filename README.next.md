<center>
<H1> NEXT 적용 README </H1>
<h3>next를 nest에 적용시 발생하는 문제들을 명시함.</h3>
</center>

## nest-next 적용기
- 이 블로그의 내용을 꼼꼼히 따라 해야 함
    + link : https://dev.to/yakovlev_alexey/creating-a-project-with-nestjs-nextjs-3i1i#creating-a-nestjs-application


## nest-next 설치 후 tsconfig 적용
- tsconfig는 ts compiler가 사용하는 config
- npx next build 명령은 tsconfig를 next용으로 바꿔 버림 (하단에 라인들을 추가함)
- 따라서 nestjs용으로 원본 tsconfig를 tsconfig.server.json 이라고 따로 만들어 둠
- package.json에 start:nd 를 만들어 개발용으로 tsconfig.server.json을 사용하도록 설정함
    * 향후 production용 빌드시에도 적용해야 함.

