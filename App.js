import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import {View, Text} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';


import {
  Auth,
  API,
  graphqlOperation,
} from 'aws-amplify';
import { getUser } from './src/graphql/queries';
import { createUser } from './src/graphql/mutations';
import { createQueue } from './src/graphql/mutations';
import * as queries from './src/graphql/queries';
import * as mutations from './src/graphql/mutations';

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
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  // async function fetchUser(){
  //   await Auth.currentAuthenticatedUser().then(data => {
  //     // console.log('data', data)
  //     setName(data.username)
  //   })
  // }
  // fetchUser();

  async function getUsers(){
    try {
      const userList = await API.graphql({query: queries.listUsers})
      // console.log(userList)
      // console.log(userList.data.listUsers.items.map((item) => item.name))
      setUsers(userList.data.listUsers.items)
      console.log(userList.data.listUsers.items)
      // console.log(customers);
      // setUsers(userdataList)
    } catch (err) { console.log('Error fetching customers', err) }
  }

  useEffect(() => {
    getUsers();
  }, [users]);


  



  
  return(
    <View style={{height: '100%', width: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
      {
        users.map((item, index) => (
          <>
            <Text>{item.name}</Text>
            <Text>{item.name}</Text>
            
          </>
        ))
      }
         
    </View>
    )
}

export default withAuthenticator(App);
