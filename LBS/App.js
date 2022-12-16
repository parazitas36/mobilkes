
import 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Home from './views/Home';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SignalsList from './views/SignalsList';
import Users from './views/Users';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createMaterialBottomTabNavigator()

const HomeStack = createStackNavigator()
const SignalsStack = createStackNavigator()
const UsersStack = createStackNavigator()

const HomeScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center'
      }}>
      <HomeStack.Screen options={{ animationEnabled: true }} name='Home' component={Home}/>
    </HomeStack.Navigator>
  )
}

const SignalsScreen = () => {
  return (
    <SignalsStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center'
      }}>
      <SignalsStack.Screen options={{ animationEnabled: true }} name='Signals' component={SignalsList}/>
    </SignalsStack.Navigator>
  )
}

const UsersScreen = () => {
  return (
    <UsersStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center'
      }}>
      <UsersStack.Screen options={{ animationEnabled: true }} name='Users' component={Users}/>
    </UsersStack.Navigator>
  )
}

const CustomLabel = ({label}) => {
  return <Text style={{ fontSize: 12, color: 'white' }}>{label}</Text>
}

const App = () => {

  return (
    <SafeAreaView
      style={{ 
        height: '100%', 
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center'
      }}>
      <StatusBar
        barStyle={'dark-content'}
      />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#93AD4F"
          inactiveColor="#694fad"
          barStyle={{ backgroundColor: '#93AD4F' }}>
          <Tab.Screen name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: <CustomLabel label="Home"/>,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              )
            }}/>
          <Tab.Screen name="SignalsList"
            component={SignalsScreen}
            options={{
              tabBarLabel: <CustomLabel label="Signals"/>,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="signal-variant" color={color} size={26} />
              )
            }}/>
          <Tab.Screen name="Users"
            component={UsersScreen}
            options={{
              tabBarLabel: <CustomLabel label="Users"/>,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account-group" color={color} size={26} />
              )
            }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
