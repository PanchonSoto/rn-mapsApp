import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/LoadingScreen/LoadingScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen/PermissionsScreen';
import { MapScreen } from '../screens/MapScreen/MapScreen';







export type RootStackParams = {
  LoadingScreen: undefined;
  PermissionsScreen: undefined;
  MapScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
     //?CONFIG
     initialRouteName='LoadingScreen'
     screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white'
      },
     }}
    >
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
}
