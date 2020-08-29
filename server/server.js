// const express = require('express');
// const app = express();
// const kakaologin = require('./routes/index');
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extends:true}));
// app.use(express.json());
// app.use(express.urlencoded({extends:true}));

// app.use('/', kakaologin);
// app.use('/login', kakaologin);

// const port = 3001;
// app.listen(port, () => console.log(`Listening on port ${port} on Node.js`));

// import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
const cors = require('cors');

// Firebase setup
const firebaseAdmin = require('firebase-admin');
// you should manually put your service-account.json in the same folder app.js
// is located at.
const serviceAccount = require('./service-account.json');

// Kakao API request url to retrieve user profile based on access token
const requestMeUrl = 'https://kapi.kakao.com/v2/user/me?secure_resource=true';

// Initialize FirebaseApp with service-account.json
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});


/**
 * requestMe - Returns user profile from Kakao API
 *
 * @param  {String} kakaoAccessToken Access token retrieved by Kakao Login API
 * @return {Promiise<Response>}      User profile response in a promise
 */
function requestMe(kakaoAccessToken) { // 사용자토큰으로 사용자 정보 얻어오기
  console.log('Requesting user profile from Kakao API server.');
  return request({
    method: 'GET',
    headers: {'Content-type':'application/x-www-form-urlencoded;charset=utf-8', 'Authorization': 'Bearer ' + kakaoAccessToken},
    url: requestMeUrl,
  });
};

/**
 * @params
 */

/**
 * updateOrCreateUser - Update Firebase user with the give email, create if
 * none exists.
 *
 * @param  {String} userId        user id per app
 * @param  {String} email         user's email address
 * @param  {String} displayName   user
 * @param  {String} photoURL      profile photo url
 * @return {Prommise<UserRecord>} Firebase user record in a promise
 */
function updateOrCreateUser(userId, email, displayName, photoURL) {
  console.log('updating or creating a firebase user');
  const updateParams = {
    provider: 'KAKAO',
    displayName: displayName,
  };
  if (displayName) {
    updateParams['displayName'] = displayName;
  } else {
    updateParams['displayName'] = email;
  }
  if (photoURL) {
    updateParams['photoURL'] = photoURL;
  }
  console.log(updateParams);
  return firebaseAdmin.auth().updateUser(userId, updateParams) // update를 시도 => user가 없다면 createUser
  .catch((error) => {
    if (error.code === 'auth/user-not-found') {
      updateParams['uid'] = userId;
      if (email) {
        updateParams['email'] = email;
      }
      return firebaseAdmin.auth().createUser(updateParams);
    }
    throw error;
  });
};


/**
 * createFirebaseToken - returns Firebase token using Firebase Admin SDK
 *
 * @param  {String} kakaoAccessToken access token from Kakao Login API
 * @return {Promise<String>}                  Firebase token in a promise
 */
function createFirebaseToken(kakaoAccessToken) {
  return requestMe(kakaoAccessToken).then((response) => { // requestMe 로 사용자토큰을 이용해서 사용자 정보를 얻어온 후에
    console.log("requestMe return");
    const body = JSON.parse(response);
    console.log(body);
    const userId = `kakao:${body.id}`;
    console.log(userId);
    if (!userId) { // 얻은 accesstoken이 없다면 종료
      return res.status(404)
      .send({message: 'There was no user with the given access token.'});
    }
    let nickname = null;
    let profileImage = null;
    if (body.properties) {
      nickname = body.properties.nickname;
      profileImage = body.properties.profile_image;
    }
    return updateOrCreateUser(userId, body.kaccount_email, nickname, // updateOrCreateUser를 이용해서 auth를 생성하거나 업데이트함
      profileImage);
  }).then((userRecord) => { // updateUser or createUser 의 반환값은 User
    const userId = userRecord.uid;
    console.log(`creating a custom firebase token based on uid ${userId}`); // uid를 이용해서 커스텀토큰을 새로 생성함
    return firebaseAdmin.auth().createCustomToken(userId, {provider: 'KAKAO'}); // 커스텀토큰을 반환
  });
};


/**
 * @param {String} AccessForCode
 * @return {Promise<Json>}
 */

function requestAccessToken(AccessForCode){
    console.log('start requesting access_token from accessforcode!');
    return request({
        method : 'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'},
        url : 'https://kauth.kakao.com/oauth/token',
        form : {
            grant_type : 'authorization_code',
            client_id : '9084ec318708cfb4deb6b4975d5865da',
            redirect_uri : 'http://localhost:3001/login',
            code : AccessForCode
        }
    });
}

// create an express app and use json body parser
const app = express();
app.use(bodyParser.json());
app.use(cors());

// default root url to test if the server is up
app.get('/', (req, res) => res.status(200)
.send('KakaoLoginServer for Firebase is up and running!'));

// app.get('/login', (req, res) => {
//     console.log(req.query);
//     const getcode = req.query.code;
//     if(!getcode) return res.status(400).send({error: 'Cant use query from kakaoApi'});

//     console.log(`get query code is : ${getcode}`);
//     requestAccessToken(getcode).then(result => {
//         console.log(`Returning kakao accessToken : ${result}`);
//         res.send({access_token : res});
//     })
// })

// actual endpoint that creates a firebase token with Kakao access token
app.all('/login', (req, res) => {
//   const token = req.body.token;
//   if (!token) return res.status(400).send({error: 'There is no token.'})
//   .send({message: 'Access token is a required parameter.'});
    console.log(req.query);
    const getcode = req.query.code;
    if(!getcode) return res.status(400).send({error: 'Cant use query from kakaoApi'});
    console.log(`get query code is : ${getcode}`);

    requestAccessToken(getcode).then(token => {
        let accesstoken = JSON.parse(token);
        accesstoken = accesstoken.access_token;
        console.log(`Verifying Kakao token: ${token}`);
        console.log(`Access_token : ${accesstoken}`);
        createFirebaseToken(accesstoken).then((firebaseToken) => {
            console.log(`Returning firebase token to user: ${firebaseToken}`);
            res.send({firebase_token: firebaseToken});
        });
    })
});

// Start the server
const server = app.listen(3001, () => {
  console.log('KakaoLoginServer for Firebase listening on port %s',
  server.address().port);
});