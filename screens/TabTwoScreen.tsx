import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useEffect } from 'react';
import * as queries from '../src/graphql/queries';

//amplify signout function

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

function queueQuery (){
   const res =  API.graphql(graphqlOperation(queries.listQueues)).then(data => {
     console.log(data)
     
   }).catch(error => {
     console.log(error)
   });
   const res2 =  API.graphql(graphqlOperation(queries.byQueueName, { name: "test3"} )).then(data => {
    console.log(data)
   }).catch(error => {
     console.log(error)
   });
}

queueQuery();

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.js" />
      <TouchableOpacity onPress={() => {
        signOut();
      }}>
        <View style={styles.button}>
          <Text>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
