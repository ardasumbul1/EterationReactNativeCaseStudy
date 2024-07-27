

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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import BottomNavigationBar from './components/BottomNavigationBar';
import {Provider} from 'react-redux';
import { store } from './redux/store';

const Stack = createNativeStackNavigator();

function App(){


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={ProductListScreen} />
          <Stack.Screen name="Product Details" component={ProductDetailScreen} />
          <Stack.Screen name="Shopping Cart" component={ShoppingCartScreen} />
        </Stack.Navigator>
        <BottomNavigationBar />
      </NavigationContainer>
    </Provider>


  );
}

const styles = StyleSheet.create({

});

export default App;
