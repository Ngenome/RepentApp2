import * as SecureStore from 'expo-secure-store';
import { LOGIN } from '../redux/actions';


export function PresentOrDefault(item:any, defaultItem:any) {
  if (item) {
    return item;
  }
  return defaultItem;
}

export function POD(item:any, defaultItem:any) {
  // check if some item is present and return the default if it is not present
  if (item) {
    return item;
  }
  return defaultItem;
}
export async function getValueFor(setPassword:any, setUsername:any,setLoading:any, setFailGet:any) {
  
  let password = await SecureStore.getItemAsync("password");
  let username = await SecureStore.getItemAsync("username");
  
  if(username!==null &&password!==null){
    setPassword(password)
    setUsername(username)
    setFailGet(false)
    setLoading(false)
    return({
      password,
      username,
    })
  }
  else{
    setFailGet(true)
    setLoading(false)
  }
}
export async function secureSave(key: any, value: any) {
  await SecureStore.setItemAsync(key, value);
}