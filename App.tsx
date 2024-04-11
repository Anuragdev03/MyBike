
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { screenNames } from './screenNames';

//Database
import { VehiclesRecordRealmContext } from './src/modals';

// Screens 
import SplashScreen from './src/screens/SplashScreen';
import AddVehicles from './src/screens/AddVehicles';
import AddVehicleForm from './src/screens/AddVehicles/AddVehicleForm';
//Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const { RealmProvider } = VehiclesRecordRealmContext;
  return (
    <SafeAreaProvider style={backgroundStyle}>
      <RealmProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={screenNames.splashScreen}
            screenOptions={{
              gestureDirection: "horizontal",
              gestureEnabled: true,
              animation: "slide_from_right",
              animationDuration: .5
            }}
          >
            <Stack.Screen
              name={screenNames.splashScreen}
              component={SplashScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={screenNames.addVehicleScreen}
              component={AddVehicles}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={screenNames.addVehicleForm}
              component={AddVehicleForm}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
