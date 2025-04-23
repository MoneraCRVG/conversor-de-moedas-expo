import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

interface Currency {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

const App = () => {
  const [currencies, setCurrencies] = useState<{ [key: string]: Currency }>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');
  const [amount, setAmount] = useState<string>('1');
  const [convertedAmount, setConvertedAmount] = useState<number | string>('');

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://economia.awesomeapi.com.br/json/all'); 
        setCurrencies(response.data);
      } catch (error) {
        console.error('Error fetching currencies', error);
      }
    };

    fetchCurrencies();
  }, []);

  const convertToBRL = () => {
    const selected = currencies[selectedCurrency];
    if (selected && selected.ask) {
      const rate = parseFloat(selected.ask);
      const result = parseFloat(amount) * rate;
      setConvertedAmount(result.toFixed(2));
    } else {
      setConvertedAmount('Moeda inválida');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Conversor de Moedas</Text>
      
      <Picker
        selectedValue={selectedCurrency}
        onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
        style={styles.picker}
      >
        {Object.keys(currencies).map((currencyCode) => (
          <Picker.Item key={currencyCode} label={currencies[currencyCode].name} value={currencyCode} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        placeholder="Insira um valor"
      />

      <Button title="Converter" onPress={convertToBRL} />

      {convertedAmount !== '' && (
        <Text style={styles.result}>
          {amount} {currencies[selectedCurrency]?.code} = {convertedAmount} BRL
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 20,
    textAlign: 'center',
  },
  result: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;
