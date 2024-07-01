
# sample
+ curl -X POST -H 'Content-Type: application/json' -d '{"name":"bb"}' http://192.168.0.7:4000/test


## post auth/signin
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!!"}' http://192.168.0.7:4000/auth/signin
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!"}' http://192.168.0.7:4000/auth/signin

# AT : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iuq0gOumrOyekCIsIm1lbUlEIjoxLCJpYXQiOjE3MTk0NjEwMjcsImV4cCI6MTcxOTQ2MTA1NywibGV2ZWwiOjAsInJvbGUiOm51bGx9.yUAd1M0s0VxDLrhlL7VYpj-R8JMLn9lzjYKiTHOeVWc
# RT : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaF90b2tlbiIsImlhdCI6MTcxOTQ2MTAyNywiZXhwIjoxNzE5NTQ3NDI3LCJtZW1JRCI6MX0.kr8zw4AAreiJeR9n2sydAS05uweOcDHMC7HgeexEE5o
curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iuq0gOumrOyekCIsIm1lbUlEIjoxLCJpYXQiOjE3MTk0NjE0MzQsImV4cCI6MTcxOTQ2MTQ2NCwibGV2ZWwiOjAsInJvbGUiOm51bGx9.1aCvtxmQCMuvmoiWCO_iUNB9wRcVa_0ulG4CHl-g4Zs" --cookie "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaF90b2tlbiIsImlhdCI6MTcxOTM4NzU1MiwiZXhwIjoxNzE5NDczOTUyLCJtZW1JRCI6MX0.MCmrkC5vDxcjXWXXEglGlHRSOrCCxzIAypGiQjxTBCU" http://192.168.0.7:4000/hello

# refresh token
curl -X POST -H 'Content-Type: application/json' --cookie "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaF90b2tlbiIsImlhdCI6MTcxMjg5ODkyOCwiZXhwIjoxNzEyODk4OTg4fQ.VurKRhFVNTqTtrAaE-Yd6DHcxMlNGDZg9FTcZv-kROU" http://192.168.0.7:4000/auth/regenerate

# Get user by armycode
curl -X GET http://192.168.0.7:4000/auth/user/00-00000
curl -X GET http://192.168.0.7:4000/auth/user2/00-00000

# update member info - PW
curl -X PATCH -H 'Content-Type: application/json' -d '{"armyCode":"00-00000", "passwd":"qwer1234!"}' http://192.168.0.7:4000/auth/user

# update member role
curl -X PATCH -H 'Content-Type: application/json' -d '{"userID":"00-00000", "role":"R_ADMIN;R_INST;R_TRAINEE"}' http://192.168.0.7:4000/auth/user

#


## curl
```sh
# sample
+ curl -X POST -H 'Content-Type: application/json' -d '{"name":"bb"}' http://192.168.0.7:4000/test

# VSTS Signup
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "userPW":"qwer1234!!", "name": "오태식이", "rank": "R4", "subType": "J1", "depID": 3 }' http://192.168.0.7:4000/auth/signup


# login
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!!"}' http://192.168.0.7:4000/auth/signin
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!"}' http://192.168.0.7:4000/auth/signin
# refresh token
curl -X POST -H 'Content-Type: application/json' --cookie "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaF90b2tlbiIsImlhdCI6MTcxMjg5ODkyOCwiZXhwIjoxNzEyODk4OTg4fQ.VurKRhFVNTqTtrAaE-Yd6DHcxMlNGDZg9FTcZv-kROU" http://192.168.0.7:4000/auth/regenerate

# Get user by armycode
curl -X GET http://192.168.0.7:4000/auth/user/00-00000
curl -X GET http://192.168.0.7:4000/auth/user2/00-00000
# update member info - PW
curl -X PATCH -H 'Content-Type: application/json' -d '{"armyCode":"00-00000", "passwd":"qwer1234!"}' http://192.168.0.7:4000/auth/user
# update member role
# curl -X PATCH -H 'Content-Type: application/json' -d '{"userID":"00-00000", "role":"R_ADMIN;R_INST;R_TRAINEE"}' http://192.168.0.7:4000/auth/user

# user password reset
curl -X PATCH -H 'Content-Type: application/json' -d '{"armyCode":"00-00000", "name":"", "password":""}' http://192.168.0.7:4000/auth/password/reset





# --------------------------------------- Unit -----------------------------------------
# create
curl -X POST -H 'Content-Type: application/json' -d '{ "name":"unit1", "code":"U11", "type":"U1" }' http://192.168.0.7:4000/admin/unit

#update
curl -X PATCH -H 'Content-Type: application/json' -d '{ "name":"unit11111", "code":"U29", "type":"U2" }' http://192.168.0.7:4000/admin/unit/10
curl -X PATCH -H 'Content-Type: application/json' -d '{ "name":"unit11111", "code":"U29", "type":"J3" }' http://192.168.0.7:4000/admin/unit/10

#delete
curl -X DELETE -H 'Content-Type: application/json' http://192.168.0.7:4000/admin/unit/10

```
