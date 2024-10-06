import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchCurrencyRates } from '../api/fetchCurrencyrate';
import useCurrencyStore from '../state/useCurrency.store';
import CurrencyListItem from '../components/currencyListItem';
import dayjs from 'dayjs';

export default function MainScreen() {
    const { currencies, setCurrencies } = useCurrencyStore();

    const callApi = async () => {
        console.log('hit')
        const data = await fetchCurrencyRates();
        setCurrencies(Object.values(data))
    }

    useEffect(() => {
        callApi();

        // const interval = setInterval(callApi, 10000); // Fetch every 10 seconds
        // return () => clearInterval(interval);
    }, [])


    const sortedCurrencies = [...currencies].sort((a, b) => a.rate - b.rate);
    const lowestCurrency = sortedCurrencies[0];
    const highestCurrency = sortedCurrencies[sortedCurrencies.length - 1];
    // console.log(lowestCurrency, highestCurrency)

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flexDirection: 'row', gap: 10, marginHorizontal: 10, marginBottom: 10 }}>

                <View style={{ flex: 1, backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
                    <Text>Highest</Text>

                    <Text>{highestCurrency.alphaCode}</Text>
                    <Text>{highestCurrency.name}</Text>
                    <Text>{highestCurrency.rate?.toFixed(2)}</Text>
                    <Text>{dayjs(highestCurrency.date).format('DD MMM YYYY hh:mm A')}</Text>

                </View>

                <View style={{ flex: 1, backgroundColor: 'green', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 }}>
                    <Text>Lowest</Text>


                    <Text>{lowestCurrency.alphaCode}</Text>
                    <Text>{lowestCurrency.name}</Text>
                    <Text>{lowestCurrency.rate?.toFixed(2)}</Text>
                    <Text>{dayjs(lowestCurrency.date).format('DD MMM YYYY hh:mm A')}</Text>
                </View>

            </View>

            <FlatList
                data={currencies}
                renderItem={({ item }) => <CurrencyListItem {...item} />}
                keyExtractor={item => item.code}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
