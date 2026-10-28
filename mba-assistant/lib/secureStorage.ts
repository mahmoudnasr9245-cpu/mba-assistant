import * as SecureStore from 'expo-secure-store';
const opts: SecureStore.SecureStoreOptions={keychainAccessible:SecureStore.AFTER_FIRST_UNLOCK};
export const secureStorage={
 getItem: async (key:string)=>SecureStore.getItemAsync(key,opts),
 setItem: async (key:string,value:string)=>{await SecureStore.setItemAsync(key,value,opts)},
 removeItem: async (key:string)=>{await SecureStore.deleteItemAsync(key,opts)}
};