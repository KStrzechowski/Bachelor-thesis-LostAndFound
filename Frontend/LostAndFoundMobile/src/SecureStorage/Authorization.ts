import { refreshToken } from 'commons';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AccessToken, RefreshToken, TokenExpirationDate } from '../../Config';

export async function saveRefreshToken(token: string) {
  await EncryptedStorage.setItem(RefreshToken, token);
}

export async function getRefreshToken(): Promise<string | null> {
  return await EncryptedStorage.getItem(RefreshToken);
}

export async function saveAccessToken(token: string, expirationDate: Date) {
  // save access token
  await EncryptedStorage.setItem(AccessToken, token);

  // save expiration date minus 30 seconds
  // we don't want to use access token in the moment it expires
  expirationDate.setSeconds(expirationDate.getSeconds() - 30);
  await EncryptedStorage.setItem(
    TokenExpirationDate,
    expirationDate.toLocaleString(),
  );
}

export async function clearStorage() {
  await EncryptedStorage.clear();
}

export async function getAccessToken(): Promise<string | null> {
  // check if access token didn't expire
  if (await isTokenExpired()) {
    // get saved refresh token
    const refreshJwtToken = await getRefreshToken();
    if (!refreshJwtToken) return null;

    // refresh access token
    const data = await refreshToken(refreshJwtToken);
    if (data) {
      // save new access token with expiration date
      await saveAccessToken(data.accessToken, data.accessTokenExpirationTime);
    } else {
      await clearStorage();
      return null;
    }
  }

  // get access token
  const accessToken = await EncryptedStorage.getItem(AccessToken);
  return accessToken;
}

async function isTokenExpired() {
  const tokenExpirationDateString = await EncryptedStorage.getItem(
    TokenExpirationDate,
  );
  if (!tokenExpirationDateString) return false;

  const expirationDate = new Date(tokenExpirationDateString);
  if (expirationDate < new Date()) {
    return true;
  } else {
    return false;
  }
}
