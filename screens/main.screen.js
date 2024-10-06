import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchCurrencyRates } from '../api/fetchCurrencyrate';
import useCurrencyStore from '../state/useCurrency.store';
import CurrencyListItem from '../components/currencyListItem';
import dayjs from 'dayjs';
import Arrow from '../assets/svg/arrow';
import HeroView from '../components/heroView';

export default function MainScreen() {
    const { currencies, setCurrencies, loading, setLoading } = useCurrencyStore();

    const callApi = async () => {
        setLoading(true);
        const data = await fetchCurrencyRates();
        await setCurrencies(Object.values(data));
        setLoading(false);
    }

    useEffect(() => {
        callApi();

        // const interval = setInterval(callApi, 10000); // Fetch every 10 seconds
        // return () => clearInterval(interval);
    }, [])


    const sortedCurrencies = [...currencies].sort((a, b) => a.rate - b.rate);
    const lowestCurrency = sortedCurrencies[0];
    const highestCurrency = sortedCurrencies[sortedCurrencies.length - 1];

    return (
        <>
            <SafeAreaView style={styles.safeArea} />
            <SafeAreaView style={styles.container}>
                {loading && currencies.length === 0 && (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" />
                    </View>
                )}

                {currencies.length > 0 && (
                    <>
                        <HeroView lowestCurrency={lowestCurrency} highestCurrency={highestCurrency} />
                        <FlatList
                            data={currencies}
                            renderItem={({ item }) => <CurrencyListItem {...item} />}
                            keyExtractor={item => item.code}
                        />
                    </>
                )}

                <View style={{ backgroundColor: 'red' }}>
                    <Text>Maroof</Text>
                </View>

                <StatusBar style="auto" />
            </SafeAreaView >
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 0,
        backgroundColor: '#5bc873'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});