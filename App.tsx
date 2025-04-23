import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { api } from './src/services/api';

type CurrencyExchange = {
  name: string;
  ask: string;
}
type Response = {
  [key: string]: CurrencyExchange;
}
export default function App() {
  const [currencies, setCurrencies] = useState<Response>({});

  useEffect(() => {
    async function getDailyCurrenciesExchanges() {
      try {
        const response: Response = await api();
        setCurrencies(response);
      } catch (error) {
        console.error(error)
      }
    }
    getDailyCurrenciesExchanges()
  }, [])

  useEffect(() => {
    console.log(currencies)
  }, [currencies])
  return (
    <View style={styles.container}>
      <Text>
      <Text>{currencies.USD?.ask ? `USD Ask: ${currencies.USD.ask}` : 'Loading...'}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
