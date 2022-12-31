import React, { Dispatch, SetStateAction } from 'react';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from 'react-native-document-picker';
import {
  Button,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const DocumentSelector = (props: {
  fileResponse: DocumentPickerResponse[];
  setFileResponse: Dispatch<SetStateAction<DocumentPickerResponse[]>>;
  label?: string;
}) => {
  const handleDocumentSelection = React.useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.images],
      });
      props.setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={handleDocumentSelection} style={styles.button}>
        <Text style={styles.buttonText}>
          {props.label ? props.label : 'Dodaj zdjęcie'}
        </Text>
        <IoniconsIcon style={{ color: Colors.white }} size={20} name="person" />
      </Pressable>
      <StatusBar barStyle={'dark-content'} />
      {props.fileResponse.map((file, index) => (
        <View
          key={index.toString()}
          style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={styles.fileNameText}
            numberOfLines={1}
            ellipsizeMode={'middle'}>
            {file?.name}
          </Text>
          {file?.name ? (
            <Button
              title="Usuń dodane zdjęcie"
              color="red"
              onPress={() => props.setFileResponse([])}
            />
          ) : (
            <></>
          )}
        </View>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginRight: 5,
  },
  fileNameText: {
    fontSize: 16,
    fontWeight: '400',
    color: 'black',
  },
});
