import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { api } from './src/services/api';

type CurrencyExchange = {
  name: string;
  ask: string;
}
type Response = {
  USD: CurrencyExchange
}
export default function App() {
  const [currencies, setCurrencies] = useState<Response[]>([]);

  useEffect(() => {
    async function getDailyCurrenciesExchanges() {
      try {
        const response: Response[] = await api();
        setCurrencies(response);
        console.log(currencies)
      } catch (error) {
        console.error(error)
      }
    }
    getDailyCurrenciesExchanges()
  }, [])
  return (
    <View style={styles.container}>
      <Text>
        {currencies.forEach((teste) => {
          return (<Text>{teste.name}</Text>)
        })}
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
