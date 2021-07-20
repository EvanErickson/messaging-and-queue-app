import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import {
  Auth,
  API,
  graphqlOperation,
} from 'aws-amplify';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
import { createQueue } from './src/graphql/mutations';

import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify from 'aws-amplify'
import config from './src/aws-exports.js'
import { useState } from 'react';
Amplify.configure(config)

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
]

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [name, setName] = useState('');

  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }

 

  // run this snippet only when App is first mounted
  async function userInfo (){ await Auth.currentAuthenticatedUser({ bypassCache: true }).then(data => {
    console.log(data)
  
  useEffect( () => {


    const fetchUser = async () => {
        console.log(data)

        setName(data.username)
      });

      fetchUser();




      if (userData.data.getUser) {
        console.log("User is already registered in database");
        await API.graphql(graphqlOperation(createQueue, {input: {name: userData.data.getUser.name}}));
        console.log(userData.data.getUser.name);
        return;
      } else{

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.name,
          imageUri: getRandomImage(),
          status: 'Hey, I am using WhatsApp',
        }

        await API.graphql(graphqlOperation(createUser, { input: {id: userInfo.attributes.sub,
          name: userInfo.name,
          imageUri: getRandomImage(),
          status: 'Hey, I am using WhatsApp',} }).promise(console.log(200)))
    }





      // userinfo CognitoUser {
      //   "Session": null,
      //   "attributes": Object {
      //     "email": "evanserickson@gmail.com",
      //     "email_verified": true,
      //     "phone_number": "+19494499650",
      //     "phone_number_verified": false,
      //     "sub": "b4aae446-8022-4869-9756-375bda563787",
      //   },
      //   "authenticationFlowType": "USER_SRP_AUTH",
      //   "client": Client {
      //     "endpoint": "https://cognito-idp.us-east-1.amazonaws.com/",
      //     "fetchOptions": Object {},
      //   },
      //   "deviceKey": undefined,
      //   "keyPrefix": "CognitoIdentityServiceProvider.4fv9gr74n7mh421a7uvqntipgr",
      //   "pool": CognitoUserPool {
      //     "advancedSecurityDataCollectionFlag": true,
      //     "client": Client {
      //       "endpoint": "https://cognito-idp.us-east-1.amazonaws.com/",
      //       "fetchOptions": Object {},
      //     },
      //     "clientId": "4fv9gr74n7mh421a7uvqntipgr",
      //     "storage": [Function MemoryStorage],
      //     "userPoolId": "us-east-1_RHENvdnrO",
      //   },
      //   "preferredMFA": "NOMFA",
      //   "signInUserSession": CognitoUserSession {
      //     "accessToken": CognitoAccessToken {
      //       "jwtToken": "eyJraWQiOiIzYm5CWUFVUHFtV09WSGtwVWE5ZVNJRU4yck5hSlwveisyY3ZqMUNxT3NNcz0iLCJhbGciOiJSUzI1NiJ9.eyJvcmlnaW5fanRpIjoiOWNlNDAzYmEtMTE4YS00ZmZkLWJhYjQtNTI1YzEzZmFlMWJhIiwic3ViIjoiYjRhYWU0NDYtODAyMi00ODY5LTk3NTYtMzc1YmRhNTYzNzg3IiwiZXZlbnRfaWQiOiI3MDNkNWZiMC05YjNlLTQ2NWMtOGQ2Yy01MDIwOWNjZTgzZDgiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjI2MzcxNzczLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9SSEVOdmRuck8iLCJleHAiOjE2MjY3Mzg2MDcsImlhdCI6MTYyNjczNTAwOCwianRpIjoiZDk4MTI5MTMtMTJlOC00MGJmLThiOTEtODcxZDY4NWU1OTdlIiwiY2xpZW50X2lkIjoiNGZ2OWdyNzRuN21oNDIxYTd1dnFudGlwZ3IiLCJ1c2VybmFtZSI6InRlc3QifQ.F19mnb9n7OAadFtZfHjZhPkC2R7vM8Lk5L1_EbZps3j8ORd0xBSOM_YjMyX-t690jeDWVc3o4yMGtgLAOYpit9wdPR71mZ0JcV6e6_tIhEta3QYBfgoka8IpdgT1YxMQz2PMqF3KRpq6EdkODFz-bxJ6_oM7DnSDTm-Pd1mS9WYqm4aXtaGRwi41sUT5CEGsVD8j-4GZDLXKIRJf7ax1jUpf_UwC44azSMt4pgKwopEGJKP0D_gh17gfZrt2dZ93ZGmNbc_dqqdCzHdc6a7HYfVK2bD8Nf0D3K1u9OuUqEJX1Y19EFK-QIbgN9MJk9WjadaVomRBt_K0ziuGfRiJ9A",
      //       "payload": Object {
      //         "auth_time": 1626371773,
      //         "client_id": "4fv9gr74n7mh421a7uvqntipgr",
      //         "event_id": "703d5fb0-9b3e-465c-8d6c-50209cce83d8",
      //         "exp": 1626738607,
      //         "iat": 1626735008,
      //         "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_RHENvdnrO",
      //         "jti": "d9812913-12e8-40bf-8b91-871d685e597e",
      //         "origin_jti": "9ce403ba-118a-4ffd-bab4-525c13fae1ba",
      //         "scope": "aws.cognito.signin.user.admin",
      //         "sub": "b4aae446-8022-4869-9756-375bda563787",
      //         "token_use": "access",
      //         "username": "test",
      //       },
      //     },
      //     "clockDrift": 0,
      //     "idToken": CognitoIdToken {
      //       "jwtToken": "eyJraWQiOiI1UWk3MEEyZ0grMVljcWpmNFo2SVwvT040VktMSGZYN3VVeURzd1FEaCtGdz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJiNGFhZTQ0Ni04MDIyLTQ4NjktOTc1Ni0zNzViZGE1NjM3ODciLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfUkhFTnZkbnJPIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjpmYWxzZSwiY29nbml0bzp1c2VybmFtZSI6InRlc3QiLCJvcmlnaW5fanRpIjoiOWNlNDAzYmEtMTE4YS00ZmZkLWJhYjQtNTI1YzEzZmFlMWJhIiwiYXVkIjoiNGZ2OWdyNzRuN21oNDIxYTd1dnFudGlwZ3IiLCJldmVudF9pZCI6IjcwM2Q1ZmIwLTliM2UtNDY1Yy04ZDZjLTUwMjA5Y2NlODNkOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjI2MzcxNzczLCJwaG9uZV9udW1iZXIiOiIrMTk0OTQ0OTk2NTAiLCJleHAiOjE2MjY3Mzg2MDcsImlhdCI6MTYyNjczNTAwOCwianRpIjoiZDc2ZGY1MTYtN2VmYS00OGI5LWI2M2YtMDY2YzM1MzRiNmIzIiwiZW1haWwiOiJldmFuc2VyaWNrc29uQGdtYWlsLmNvbSJ9.TEJkUlYbRyFyIDzPR-aKhOGoI-9H6UT5OZq7dZM35SmIlw2PBdAf6e5ubtCw5Y43Y0A8xXaKyvOk2GWKjpSPorxi3woBs4mlRjau3mJJ6vXH17-J7njSUymiR9HcVnDpsvMxWLF6Y45Nn58TDe2CfS49hoYdwM_xfEOIId7fmv46l685TMiqKXc-fAgZDO-k7KcS3dXMQxqP8Jvsno1nleMq8ardopALKrPsAcSxokesFaoOrXMEz0pHmY6n9Ysrb-aV0l5jUhxLWe2-WVbzTroRfKqxIXFOq-oKnBItGGoiGoWW202GEe0mRPw_0Dx5PKg9bYJFX1R1eurZzDWLXw",
      //       "payload": Object {
      //         "aud": "4fv9gr74n7mh421a7uvqntipgr",
      //         "auth_time": 1626371773,
      //         "cognito:username": "test",
      //         "email": "evanserickson@gmail.com",
      //         "email_verified": true,
      //         "event_id": "703d5fb0-9b3e-465c-8d6c-50209cce83d8",
      //         "exp": 1626738607,
      //         "iat": 1626735008,
      //         "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_RHENvdnrO",
      //         "jti": "d76df516-7efa-48b9-b63f-066c3534b6b3",
      //         "origin_jti": "9ce403ba-118a-4ffd-bab4-525c13fae1ba",
      //         "phone_number": "+19494499650",
      //         "phone_number_verified": false,
      //         "sub": "b4aae446-8022-4869-9756-375bda563787",
      //         "token_use": "id",
      //       },
      //     },
      //     "refreshToken": CognitoRefreshToken {
      //       "token": "eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.aF5LPz_tJUaw7lKi-QN6GHmhM2KIyGkx3vB2oIavNdUHusntQia_ijKwQKEf-QfHSkRo67LPmF1buzLzXN4skKbeA5amAK1PoKviXyxOnNJXY2iUwPCsBk_Hrb40I2p2hH637LSY2gnTgzt4S8dq87Z0bYZHjwYB2rJ65j_G9Decfg-sV3q-6AAIOXDtHJebQUbtC0SzbcPQR8iDhCRSNVVf7CuLIgc2Qw-o92x5DvPDFYlbrIQfeeKD3hYtR_FIkwQ5Hyf-7M9diJevZnWS1sly25INei7TdEqUPty83EY-fWuXqkdMfMuGFiBesCCzY3R1Rqwgyy3-7YkLf6HFqw.Ag90ditzVt2-Lqe4.CkMsB5dFLDhke7sdXo8LPElcThSMz-nZvgdqupc-3ovZGAGORHp92Spf2D6fe5pt8pAVWyZ3huz1pTG6MF-SqEMgP_vKEuNFCpoze7qg6B79WY7A5rE3fAuotvTHEOBZiFiLTdxhyLwLJE7GQng3IYl6GMb83oszQj2sxYr0ZYXcqh23TliK8XIxtzQk6VGw31FuaJv6B_sHpxSI6zuF5X1S2wfTics5TI9k9L4PGuuxauISNjeplLD4Dgy0aNuogyAEfSsNSr1-eztadSrWzSvK2YLsH63-iNNvTwGUjY2YXNb5-8cwbzWJX22gP2sFkVoxMaQ-ssm76jp67cfELgNsjUmzjzRtPYrf5L9vpm9TqDFCD4AwbamTj5mTQmaMdSLHvgfCZky_OX9LAznN963ncm2bPABmS4NAq8BXTSxVanbYNqgfCZBSe8RpgX2sdkf_HbGvQuUFucbXyH563dxwLUgPt0x5OTJSOU_k8rPFSD0TTZ6NZqTJgI_DtFFj4NUMH9YnRAAN4fRbSpg8G96MLRfa9eV-z34wgweX4CVJ5GO4Cyo0If-VJqZS41aAxxNXcwp8--JW7wBX_N929a32-aNxyT6VIKbqHvgE31cToXL4tkMkm6m7PtWfb4eMBkZ8SwgUW1pfYHkUrjmjPZ5w509dycyQW9Hi9a7k2DHLg4mEWn49YFHi_xeRld65abAbPie9xKpMPOiyHl4l__ymCRX2YxdzRLYrQQjmxXZ2FO07hyzkbbLENhayA-ihB5hvrs7Wf5ZWjOqdGjiWbUrPklEXh7cOaDEzA_89r1rRGp8TvbN0EgkGuW8f4_EFjk80wi1VkDcgvdH87sSUIs32Sq09hm4vFESBSutpmYkZeX2X6xmlmI3GPiG44wQTG74S9giwaNb9NpSeT6mSYvd9pjPX8l3u18Ed_M5qAJi2c-Uy6HTAi6B_UGlFBCJGOEDsQ1AIfGqLe1CBkLO7Mqh--pDdCasu3gqemlhdob1KwG6fxH4qXIuI3bz-OqVB7A4aRPpeRgYTd_XIjgEnSZu9iYB3iob3gM6nNqoXdVB4x3Zw5HJx_QCs6KRvf5UQWsH8iAVaZsukey2CcBNA-BNAoQ2YkTM9fS8nAPCDT54IwdTivxMqL33vIocYEs_c4rhptQNdHcfIVIiqaQS4_5syR5x54u2W8tDQMFUiCJhcLcUphKLGwkM38XCt-M1XP90hbDVlRGBEkpbIbJzrpiauz7X8dJtJJ0peH5gooHYs94ByM-I5CRVhIKaqbZNI2A.NNBZscloR10Ki0fF-BUTSw",
      //     },
      //   },
      //   "storage": [Function MemoryStorage],
      //   "userDataKey": "CognitoIdentityServiceProvider.4fv9gr74n7mh421a7uvqntipgr.test.userData",
      //   "username": "test",
      // }
















          }


  }, [])



  
  }


export default withAuthenticator(App);
