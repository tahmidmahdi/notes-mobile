import {AntDesign} from '@expo/vector-icons';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {db} from '../../App';
export default function Home({navigation, route, user}) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState([]);

  const renderItem = ({item}) => {
    const {title, description, color} = item;
    return (
      <Pressable
        style={{
          backgroundColor: color,
          marginBottom: 25,
          margin: 15,
          padding: 15,
          borderRadius: 16,
        }}
        onPress={() => navigation.navigate('Update', {item})}
      >
        <Pressable
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            padding: 15,
            zIndex: 4,
          }}
          onPress={() => deleteDoc(doc(db, 'notes', item.id))}
        >
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
        <Text style={{color: 'white', fontSize: 24}}>{item.title}</Text>
        <Text style={{color: 'white', fontSize: 18, marginTop: 16}}>
          {item.description}
        </Text>
      </Pressable>
    );
  };

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'notes'), where('uid', '==', user.uid));
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({...doc.data(), id: doc.id});
      });
      setNotes(list);
      setLoading(false);
    });
    return notesListenerSubscription;
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      >
        <ActivityIndicator size="large" color="black" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <Text>My Notes</Text>
        <Pressable onPress={() => navigation.navigate('Create')}>
          <AntDesign name="pluscircleo" size={24} color="black" />
        </Pressable>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
    </SafeAreaView>
  );
}
