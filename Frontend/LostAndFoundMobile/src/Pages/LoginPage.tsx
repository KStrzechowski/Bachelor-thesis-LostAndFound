import {
  LoginRequestType,
  LoginResponseType,
  LoginFromServerType,
  mapLoginFromServer,
} from 'commons';
import React from 'react';
import { DevSettings, Image, Text, View } from 'react-native';
import {
  CustomTextInput,
  InputSection,
  MainButton,
  MainContainer,
  MainTitle,
  PressableText,
  Subtitle,
} from '../Components/MainComponents';
import { Logo } from '../Images';
import { saveAccessToken, saveRefreshToken } from '../SecureStorage';

export const login = async (
  user: LoginRequestType,
): Promise<LoginResponseType | undefined> => {
  const result = await http<LoginFromServerType, LoginRequestType>({
    path: 'account/login',
    method: 'post',
    body: user,
  });
  console.log(result);

  if (result.ok && result.body) {
    return mapLoginFromServer(result.body);
  } else {
    return undefined;
  }
};

const loginUser = async (email: string, password: string) => {
  if (!email || !password) return;
  const loginRequest: LoginRequestType = {
    email,
    password,
  };

  const loginResponse = await login(loginRequest);
  if (loginResponse) {
    console.log(loginResponse);
    await saveAccessToken(
      loginResponse.accessToken,
      loginResponse.accessTokenExpirationTime,
    );
    await saveRefreshToken(loginResponse.refreshToken);
    DevSettings.reload();
  }
};

export const LoginPage = (props: { navigation: string[] }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const onUsernameChange = (email: string) => {
    setEmail(email);
  };

  const onPasswordChange = (password: string) => {
    setPassword(password);
  };

  return (
    <MainContainer>
      <Image
        source={Logo}
        style={{ width: '100%', resizeMode: 'stretch', marginBottom: 20 }}
      />
      <MainTitle>Zaloguj się</MainTitle>
      <Subtitle>Hej! Dobrze cię znowu widzieć</Subtitle>
      <InputSection title="E-mail">
        <CustomTextInput
          onChangeText={onUsernameChange}
          keyboardType={'email-address'}
          placeholder="Podaj swój adres e-mail"
        />
      </InputSection>
      <InputSection title="Hasło">
        <CustomTextInput
          onChangeText={onPasswordChange}
          secureTextEntry={true}
          keyboardType={'default'}
          placeholder="********"
        />
      </InputSection>
      <MainButton
        label="Zaloguj się"
        onPress={async () => await loginUser(email, password)}
      />
      <View style={{ alignItems: 'center' }}>
        <Text>Nie masz konta?</Text>
        <PressableText
          text="Zarejestruj się"
          onPress={() => props.navigation.push('Registration')}
        />
      </View>
    </MainContainer>
  );
};

export const webAPIUrl = `https://192.168.212.251:5000`;
export interface HttpRequest<REQB> {
  path: string;
  method?: string;
  body?: REQB;
  accessToken?: string;
}

export interface HttpResponse<RESB> {
  ok: boolean;
  body?: RESB;
}

export const http = async <RESB = undefined, REQB = undefined>(
  config: HttpRequest<REQB>,
): Promise<HttpResponse<RESB>> => {
  console.log(`${webAPIUrl}/${config.path}`);
  const request = new Request(`${webAPIUrl}/${config.path}`, {
    method: config.method || 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    body: config.body ? JSON.stringify(config.body) : undefined,
  });
  if (config.accessToken) {
    request.headers.set('Authorization', `Bearer ${config.accessToken}`);
  }
  // console.log(request);

  return await fetch(request)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (json) {
      console.log(json);
      return {
        ok: json.ok,
      };
    })
    .catch(function (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
      // ADD THIS THROW error
      throw error;
    });

  /*console.log(response);
  if (response.ok) {
    const body = await response.json();
    return { ok: response.ok, body };
  } else {
    logError(request, response);
    return { ok: response.ok };
  }*/
};

const logError = async (request: Request, response: Response) => {
  const contentType = response.headers.get('content-type');
  let body: any;
  if (contentType && contentType.indexOf('application/json') !== -1) {
    body = await response.json();
  } else {
    body = await response.text();
  }
  console.error(`Error reqesting ${request.method} ${request.url}`, body);
};
