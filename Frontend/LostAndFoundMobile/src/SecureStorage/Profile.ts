import EncryptedStorage from 'react-native-encrypted-storage';
import { USER_ID, USER_PHOTO_URL } from '../../Config';

export async function saveUserId(userId: string) {
  await EncryptedStorage.setItem(USER_ID, userId);
}

export async function getUserId(): Promise<string | null> {
  return await EncryptedStorage.getItem(USER_ID);
}

export async function saveUserPhotoUrl(UserPhotoUrl: string) {
  await EncryptedStorage.setItem(USER_PHOTO_URL, UserPhotoUrl);
}

export async function getUserPhotoUrl(): Promise<string | null> {
  return await EncryptedStorage.getItem(USER_PHOTO_URL);
}

export async function removeUserPhotoUrl() {
  await EncryptedStorage.removeItem(USER_PHOTO_URL);
}
