import 'react-native-get-random-values';

import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import { screenNames } from './screenNames';
import { Colors } from './src/helpers/constants';
import Ionicons from "react-native-vector-icons/Ionicons"
//Database
import { VehiclesRecordRealmContext } from './src/modals';

// Screens 
import SplashScreen from './src/screens/SplashScreen';
import AddVehicles from './src/screens/AddVehicles';
import AddVehicleForm from './src/screens/AddVehicles/AddVehicleForm';
import Dashboard from './src/screens/Dashboard';
import ServiceDetails from './src/screens/ServiceDetails';
import AddEditServiceDetails from './src/screens/ServiceDetails/AddEditServiceDetail';
import ViewServiceDetail from './src/screens/ServiceDetails/ViewServiceDetail';

//Navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={screenNames.dashboard}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";
          let routeName = route.name;

          if (routeName === screenNames.dashboard) {
            iconName = focused ? "analytics-sharp" : "analytics-outline";
          } else if (routeName === screenNames.serviceDetails) {
            iconName = focused ? "settings-sharp" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.green,
        tabBarStyle: {
          backgroundColor: Colors.lightVilot,
          paddingBottom: 5,
          paddingTop: 4,
        },
        headerShown: false,
        tabBarLabel: ({focused}) => {
          let name = "";
          let color = "#36454F";

          if(focused) color = "#4CAF50"

          if(route.name === screenNames.dashboard) {
            name = "Dashboard"
          } else if(route.name === screenNames.serviceDetails) {
            name = "Service Details"
          }
          return <Text style={{fontSize: 12, fontWeight: "500", color: color}}>{name}</Text>
        }
      })}

    >
      {/* Dashboard */}
      <Tab.Screen name={screenNames.dashboard} component={Dashboard} />

      {/* Service details screen */}
      <Tab.Screen name={screenNames.serviceDetails} component={ServiceDetails} />

    </Tab.Navigator>
  )
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: "#9246FF",
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
              name={screenNames.main}
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
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

            <Stack.Screen
              name={screenNames.addEditServiceDetails}
              component={AddEditServiceDetails}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name={screenNames.ViewServiceDetail}
              component={ViewServiceDetail}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RealmProvider>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <Toast />

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
