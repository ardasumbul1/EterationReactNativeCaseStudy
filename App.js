import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ShoppingCartScreen from './screens/ShoppingCartScreen';
import BottomNavigationBar from './components/BottomNavigationBar';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Header from './components/Header';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea}>
          <Header />
        </SafeAreaView>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={ProductListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Product Details"
            component={ProductDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Shopping Cart"
            component={ShoppingCartScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <BottomNavigationBar />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 0, // Ensure it only takes up necessary space
  },
});

export default App;