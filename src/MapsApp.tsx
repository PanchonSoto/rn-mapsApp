import './gesture-handler';

import { NavigationContainer } from "@react-navigation/native";

import { StackNavigator } from './presentation/navigator/StackNavigator';


// !App name
export const MapsApp = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
