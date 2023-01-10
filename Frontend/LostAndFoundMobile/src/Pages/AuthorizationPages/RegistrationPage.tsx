import { register, RegisterRequestType } from 'commons';
import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { light, secondary } from '../../Components';
import {
  CustomTextInput,
  InputSection,
  MainButton,
  MainContainer,
  MainScrollContainer,
  PressableText,
} from '../../Components/MainComponents';

async function registerAccount(
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
): Promise<boolean> {
  const registerRequest: RegisterRequestType = {
    username,
    email,
    password,
    confirmPassword,
  };

  const registerResponse = await register(registerRequest);
  if (registerResponse) {
    return true;
  } else {
    return false;
  }
}

export const RegistrationPage = (props: { navigation: string[] }) => {
  const [email, setEmail] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const onEmailChange = (email: string) => {
    setEmail(email);
  };

  const onUsernameChange = (email: string) => {
    setUsername(email);
  };

  const onPasswordChange = (password: string) => {
    setPassword(password);
  };

  const onConfirmPasswordChange = (password: string) => {
    setConfirmPassword(password);
  };

  return (
    <MainContainer>
      <Appbar.Header style={{ backgroundColor: secondary }}>
        <Appbar.BackAction
          color={light}
          onPress={() => props.navigation.pop()}
        />
        <Appbar.Content
          title="Zarejestruj się"
          titleStyle={{
            textAlign: 'center',
            color: light,
            fontWeight: 'bold',
          }}
        />
        <Appbar.Action icon="flask-empty" color={secondary}></Appbar.Action>
      </Appbar.Header>
      <MainScrollContainer>
        <InputSection title="E-mail">
          <CustomTextInput
            testID="emailPlaceholder"
            onChangeText={onEmailChange}
            keyboardType={'email-address'}
            placeholder="Podaj swój adres e-mail"
          />
        </InputSection>
        <InputSection title="Nazwa użytkownika">
          <CustomTextInput
            testID="usernamePlaceholder"
            onChangeText={onUsernameChange}
            keyboardType={'default'}
            placeholder="Podaj swoją nazwę użytkownika"
          />
        </InputSection>
        <InputSection title="Hasło">
          <CustomTextInput
            testID="passwordPlaceholder"
            onChangeText={onPasswordChange}
            secureTextEntry={true}
            keyboardType={'default'}
            placeholder="********"
          />
        </InputSection>
        <InputSection title="Powtórz hasło">
          <CustomTextInput
            testID="confirmPasswordPlaceholder"
            onChangeText={onConfirmPasswordChange}
            secureTextEntry={true}
            keyboardType={'default'}
            placeholder="********"
          />
        </InputSection>
        <MainButton
          testID="registerButton"
          label="Zarejestruj się"
          onPress={async () => {
            const isRegistered = await registerAccount(
              username,
              email,
              password,
              confirmPassword,
            );
            if (isRegistered) {
              props.navigation.push('Login');
            }
          }}
        />
        <View style={{ alignItems: 'center' }}>
          <Text>Masz konto?</Text>
          <PressableText
            testID="loginButton"
            text="Zaloguj się"
            onPress={() => props.navigation.push('Login')}
          />
        </View>
      </MainScrollContainer>
    </MainContainer>
  );
};
