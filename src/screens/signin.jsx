import {signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {auth} from '../../App';
import Button from '../components/Button';
import Input from '../components/input';

export default function Signin({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const login = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        source={require('../../assets/walk.png')}
        style={{width: 300, height: 300, alignSelf: 'center'}}
      />
      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
        Never forget your notes
      </Text>
      <View style={{paddingVertical: 25, paddingHorizontal: 16}}>
        <Input
          placeholder="Email Address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          title={`${loading ? 'Loading...' : 'Login'}`}
          onPress={login}
          customStyles={{alignSelf: 'center', marginBottom: 60}}
        />
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text>
            Don't have an account?{' '}
            <Text style={{color: 'green', fontWeight: 'bold'}}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
