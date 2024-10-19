// App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { DataContextProvider } from './src/contexts/DataContext';
import { CartContextProvider } from './src/contexts/CartContext';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <DataContextProvider>
          <CartContextProvider>
            <AppNavigation />
          </CartContextProvider>
        </DataContextProvider>
      </NavigationContainer>
    </SafeAreaView>
  )
}

export default App;
