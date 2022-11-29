import {createUserWithEmailAndPassword} from 'firebase/auth';
import {addDoc, collection} from 'firebase/firestore';
import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {showMessage} from 'react-native-flash-message';
import {auth, db} from '../../App';
import Button from '../components/Button';
import Input from '../components/input';
const genderOptions = ['Male', 'Female'];

export default function Signup({navigation}) {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    setLoading(true);
    try {
      // 1- Create a user with email and password
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2- add user profile to database
      await addDoc(collection(db, 'users'), {
        name: name,
        email: email,
        age: age,
        gender: gender,
        uid: result?.user.uid,
      });
      setLoading(false);
    } catch (error) {
      showMessage({
        message: error.message,
        type: 'danger',
      });
      setLoading(false);
    }

    // 3- navigate to home screen
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingVertical: 25, paddingHorizontal: 16}}>
        <Input
          onChangeText={(text) => setEmail(text)}
          placeholder="Email address"
          autoCapitalize="none"
        />
        <Input
          onChangeText={(text) => setPassword(text)}
          placeholder="password"
          secureTextEntry
        />
        <Input
          onChangeText={(text) => setName(text)}
          placeholder="Full Name"
          autoCapitalize="words"
        />
        <Input onChangeText={(text) => setAge(text)} placeholder="Age" />
        <View style={{marginVertical: 20}}>
          <Text>Select Gender</Text>
        </View>
        {genderOptions.map((option) => (
          <Pressable
            style={styles.radioContainer}
            key={option}
            onPress={() => setGender(option)}
          >
            <View
              style={[
                styles.outerCircle,
                gender === option && styles.selectedOuterCircle,
              ]}
            >
              <View
                style={[
                  styles.innerCircle,
                  gender === option && styles.selectedInnerCircle,
                ]}
              />
            </View>
            <Text style={styles.radioText}>{option}</Text>
          </Pressable>
        ))}
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Button
          title={`${loading ? 'Loading...' : 'Signup'}`}
          customStyles={{alignSelf: 'center', marginBottom: 60}}
          onPress={signup}
        />
        <Pressable onPress={() => navigation.navigate('Signin')}>
          <Text>
            Already have an account?{' '}
            <Text style={{color: 'green', fontWeight: 'bold'}}>Sign in</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  outerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CFCFCF',
    // marginRight: 10,
  },
  selectedOuterCircle: {
    borderColor: 'orange',
  },
  selectedInnerCircle: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
});
