import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './contexts/AuthContext';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import SectionCanvasScreen from './screens/SectionCanvasScreen';
import WorkbenchScreen from './screens/WorkbenchScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="MenuScreen" component={MenuScreen} />
          <Stack.Screen name="SectionCanvasScreen" component={SectionCanvasScreen} />
          <Stack.Screen name="WorkbenchScreen" component={WorkbenchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
