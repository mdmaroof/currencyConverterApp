import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchCurrencyRates } from '../api/fetchCurrencyrate';
import useCurrencyStore from '../state/useCurrency.store';
import CurrencyListItem from '../components/currencyListItem';
import HeroView from '../components/heroView';
import Footer from '../components/footer';

export default function MainScreen() {
    const { currencies, setCurrencies, loading, setLoading } = useCurrencyStore();
    const [sortValue, setSortValue] = useState(null);

    const callApi = async () => {
        setLoading(true);
        const data = await fetchCurrencyRates();
        await setCurrencies(Object.values(data));
        setLoading(false);
    }

    useEffect(() => {
        callApi();
    }, []);


    const sorting = () => {
        if (!sortValue) setSortValue('asc')
        if (sortValue === 'asc') setSortValue('des')
        if (sortValue === 'des') setSortValue(null)
    }


    const sortedCurrencies = [...currencies].sort((a, b) => a.rate - b.rate);
    const lowestCurrency = sortedCurrencies[0];
    const highestCurrency = sortedCurrencies[sortedCurrencies.length - 1];

    let sortValues = [...currencies];

    if (sortValue === 'asc') {
        sortValues = [...currencies].sort((a, b) => a.rate - b.rate);
    }
    if (sortValue === 'des') {
        sortValues = [...currencies].sort((a, b) => b.rate - a.rate);
    }

    const { listView, safeArea, container, loader } = styles;

    return (
        <>
            <SafeAreaView style={safeArea} />
            <SafeAreaView style={container}>
                {loading && currencies.length === 0 && (
                    <View style={loader}>
                        <ActivityIndicator size="large" />
                    </View>
                )}

                {currencies.length > 0 && (
                    <>
                        <HeroView lowestCurrency={lowestCurrency} highestCurrency={highestCurrency} />
                        <View style={listView}>
                            <FlatList
                                data={sortValues}
                                renderItem={({ item }) => <CurrencyListItem {...item} />}
                                keyExtractor={item => item.code}
                            />
                        </View>
                        <Footer date={lowestCurrency?.date} sorting={sorting} />
                    </>
                )}
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
        backgroundColor: '#303030'
    },
    listView: {
        flex: 1,
        backgroundColor: '#1b1b1b',
        paddingTop: 10,
        marginTop: -15,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        zIndex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});