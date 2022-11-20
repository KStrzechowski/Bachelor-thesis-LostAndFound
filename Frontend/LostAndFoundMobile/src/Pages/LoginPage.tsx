import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { CustomTextInput, InputSection, MainButton, MainContainer, MainTitle, PressableText, Subtitle } from '../Components/MainComponents';

export const LoginPage = (props: { navigation: string[]; }) => {
  const [email, setEmail] = React.useState<String | null>(null);
  const [password, setPassword] = React.useState<String | null>(null);

  const onUsernameChange = (email: String) => {
    setEmail(email);
  }

  const onPasswordChange = (password: String) => {
    setPassword(password);
  }

  return (
    <MainContainer>
      <MainTitle>Zaloguj się</MainTitle>
      <Subtitle>Hej! Dobrze cię znowu widzieć</Subtitle>
      <InputSection title='E-mail' >
        <CustomTextInput 
          onChangeText={onUsernameChange}
          keyboardType={"email-address"}
          placeholder="Podaj swój adres e-mail"
        />
      </InputSection>
      <InputSection title='Hasło' >
        <CustomTextInput 
            onChangeText={onPasswordChange}
            secureTextEntry={true}
            keyboardType={"default"}
            placeholder="********"
          />
      </InputSection>
      <MainButton label='Zaloguj się' onPress={() => props.navigation.push("Posts")}/>
      <View style={{alignItems: 'center'}}>
        <Text>Nie masz konta?</Text>
        <PressableText text="Zarejestruj się" onPress={() => props.navigation.push('Registration')}/>
      </View>
    </MainContainer>
    );
}
