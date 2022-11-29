import {doc, updateDoc} from 'firebase/firestore';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {db} from '../../App';
import Button from '../components/Button';
import Input from '../components/input';
const noteColorOptions = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];
export default function Update({navigation, route}) {
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  const onPressUpdate = async () => {
    setLoading(true);
    try {
      // update data firestore
      await updateDoc(doc(db, 'notes', noteItem.id), {
        title: title,
        description: description,
        color: noteColor,
      });
      setLoading(false);
      showMessage({
        message: 'Note Created Successfully',
        type: 'success',
      });
      navigation.goBack();
    } catch (err) {
      // loading false
      setLoading(false);
      console.log('🚀 ~ file: create.jsx ~ line 26 ~ onPressCreate ~ err', err);
    }
  };
  return (
    <SafeAreaView style={{marginHorizontal: 20, flex: 1}}>
      <Input
        placeholder="Title"
        onChangeText={(text) => setTitle(text)}
        value={title}
      />
      <Input
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        multiline={true}
        value={description}
      />
      <View style={{marginTop: 28, marginBottom: 15}}>
        <Text>Select your note color</Text>
      </View>
      {noteColorOptions.map((option) => (
        <Pressable
          style={styles.radioContainer}
          key={option}
          onPress={() => setNoteColor(option)}
        >
          <View
            style={[
              styles.outerCircle,
              noteColor === option && styles.selectedOuterCircle,
            ]}
          >
            <View
              style={[
                styles.innerCircle,
                noteColor === option && styles.selectedInnerCircle,
              ]}
            />
          </View>
          <Text style={styles.radioText}>{option}</Text>
        </Pressable>
      ))}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          title={'Submit'}
          customStyles={{
            alignSelf: 'center',
            marginBottom: 60,
            marginTop: 30,
            width: '100%',
          }}
          onPress={onPressUpdate}
        />
      )}
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
