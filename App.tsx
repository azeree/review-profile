import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import CustomDrawer from './src/components/Sidebar';
import AboutScreen from './src/screens/AboutScreen';
import FAQScreen from './src/screens/FAQScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          drawerStyle: {
            width: 280,
          },
          headerStyle: {
            backgroundColor: '#dc2626',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Drawer.Screen 
          name="Profile" 
          component={ProfileScreen as any}
          options={{ title: 'My Profile' }}
        />
        <Drawer.Screen 
          name="About" 
          component={AboutScreen as any}
          options={{ title: 'About App' }}
        />
        <Drawer.Screen 
          name="FAQ" 
          component={FAQScreen as any}
          options={{ title: 'FAQ' }}
        />
        <Drawer.Screen 
          name="Settings" 
          component={SettingsScreen as any}
          options={{ title: 'Settings' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}