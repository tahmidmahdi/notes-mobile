import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {initializeApp} from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import Create from './src/screens/create';
import Edit from './src/screens/edit';
import Home from './src/screens/home';
import Signin from './src/screens/signin';
import Signup from './src/screens/signup';
import Update from './src/screens/update';

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: 'AIzaSyBZSMfS9bW5gcHVcGa8OStyp4wf0Hal7oc',
  authDomain: 'note-app-7058d.firebaseapp.com',
  projectId: 'note-app-7058d',
  storageBucket: 'note-app-7058d.appspot.com',
  messagingSenderId: '633070877061',
  appId: '1:633070877061:web:3e4ce2eea460e9b3c16cec',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};
export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return authSubscription;
  }, []);

  // useEffect(() => {
  //   signOut(auth)
  // })

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="black" size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={AppTheme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Home" options={{headerShown: false}}>
              {(props) => <Home {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Create">
              {(props) => <Create {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="Edit" component={Edit} />
            <Stack.Screen name="Update" component={Update} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
