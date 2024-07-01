
# sample
+ curl -X POST -H 'Content-Type: application/json' -d '{"name":"bb"}' http://192.168.0.7:4000/test


## post auth/signin
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!!"}' http://192.168.0.7:4000/auth/signin
curl -X POST -H 'Content-Type: application/json' -d '{"userID":"00-00000", "passwd":"qwer1234!"}' http://192.168.0.7:4000/auth/signin

# AT : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iuq0gOumrOyekCIsIm1lbUlEIjoxLCJpYXQiOjE3MTk3OTQ1MTMsImV4cCI6MTcxOTc5NDU0MywibGV2ZWwiOjAsInJvbGUiOm51bGx9.PznpxqYW3LOhQqes4d6gr3nad9r-cDlnQf74FKIiSUE
# RT : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaF90b2tlbiIsImlhdCI6MTcxOTc5NDUxMywiZXhwIjoxNzE5ODgwOTEzLCJtZW1JRCI6MX0.mtTFI6PQbNJoPPN7QEOmgaH1yZu5v_gUHtfu7dZO6n4
curl -X GET -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iuq0gOumrOyekCIsIm1lbUlEIjoxLCJpYXQiOjE3MTk4MTk2MzgsImV4cCI6MTcxOTgxOTY2OCwibGV2ZWwiOjAsInJvbGUiOm51bGx9.4KTG6mHUNaPhDEpHPSumm6JpALOe3kdRQj0nXTuf9fg" --cookie "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoicmVmcmVzaF90b2tlbiIsImlhdCI6MTcxOTc5NDUxMywiZXhwIjoxNzE5ODgwOTEzLCJtZW1JRCI6MX0.mtTFI6PQbNJoPPN7QEOmgaH1yZu5v_gUHtfu7dZO6n4" http://192.168.0.7:4000/hello

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
