import './gesture-handler';

import { NavigationContainer } from "@react-navigation/native";

import { StackNavigator } from './presentation/navigator/StackNavigator';
import { PermissionChecker } from './presentation/providers/PermissionChecker';


// !App name
export const MapsApp = () => {
  return (
    <NavigationContainer>
      <PermissionChecker>
        <StackNavigator />
      </PermissionChecker>
    </NavigationContainer>
  );
}
