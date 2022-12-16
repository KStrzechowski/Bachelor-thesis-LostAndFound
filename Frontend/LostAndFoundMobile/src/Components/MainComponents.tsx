import React, { PropsWithChildren } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const MainContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <SafeAreaView style={styles.pageContainer}>{children}</SafeAreaView>;
};

export const MainTitle: React.FC<TextProps> = ({ children }) => {
  return <Text style={styles.mainTitle}>{children}</Text>;
};

export const Subtitle: React.FC<TextProps> = ({ children }) => {
  return <Text style={styles.subtitle}>{children}</Text>;
};

export const InputSection: React.FC<
  PropsWithChildren<{
    title: string;
  }>
> = ({ children, title }) => {
  return (
    <View style={styles.inputSectionContainer}>
      <Text style={styles.inputSectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

export const CustomTextInput: React.FC<TextInputProps> = ({
  onChangeText,
  keyboardType,
  placeholder,
  secureTextEntry,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export const MainButton: React.FC<
  PropsWithChildren<{
    label: string;
    onPress: any;
  }>
> = ({ label, onPress }) => {
  return (
    <Pressable style={styles.mainButton} onPress={onPress}>
      <Text style={styles.mainButtonText}>{label}</Text>
    </Pressable>
  );
};

export const SecondaryButton: React.FC<
  PropsWithChildren<{
    label: string;
    onPress: any;
  }>
> = ({ label, onPress }) => {
  return (
    <Pressable style={styles.secondaryButton} onPress={onPress}>
      <Text style={styles.secondaryButtonText}>{label}</Text>
    </Pressable>
  );
};

export const PressableText: React.FC<
  PropsWithChildren<{
    text: string;
    onPress: any;
  }>
> = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.pressableText}>{text}</Text>
    </Pressable>
  );
};

export const ScoreView = (props: { score?: number }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
      }}>
      <AntDesignIcon name="star" size={25} style={{ color: 'gold' }} />
      <Text style={{ fontSize: 18 }}>{props.score}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  pageContainer: {
    padding: 30,
    paddingTop: 30,
    flex: 1,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'light-grey',
  },
  inputSectionContainer: {
    paddingTop: 20,
  },
  inputSectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'light-grey',
  },
  highlight: {
    fontWeight: '700',
  },
  mainButton: {
    alignItems: 'center',
    margin: 10,
    padding: 20,
    backgroundColor: 'orange',
    borderRadius: 8,
  },
  mainButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.white,
  },
  secondaryButton: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'orange',
    borderRadius: 5,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
  pressableText: {
    color: 'orange',
  },
});
