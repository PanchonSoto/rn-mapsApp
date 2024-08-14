import { PropsWithChildren, useEffect } from 'react';
import { View, Text, AppState } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { usePermissionStore } from '../store/permissions/usePermissionStore';
import { RootStackParams } from '../navigator/StackNavigator';


export const PermissionChecker = ({children}:PropsWithChildren) => {

  const { locationStatus, checkLocationPermission } = usePermissionStore();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();


  useEffect(() => {
    if(locationStatus==='granted'){
      navigation.reset({
        routes: [{name: 'MapScreen'}],
      });

    } else if(locationStatus!=='undetermined'){
      navigation.reset({
        routes: [{name: 'PermissionsScreen'}],
      });
    }

  }, [locationStatus])


  useEffect(() => {
      checkLocationPermission();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState)=>{
        console.log('AppstateChange: ',{nextAppState})

        if(nextAppState==='active') {
            checkLocationPermission();
        }
    });

    return () => {
      subscription.remove();
    }
  }, []);



  return (
    <>{children}</>
  );
}
