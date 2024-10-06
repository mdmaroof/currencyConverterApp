import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchCurrencyRates } from '../api/fetchCurrencyrate';
import useCurrencyStore from '../state/useCurrency.store';
import CurrencyListItem from '../components/currencyListItem';
import HeroView from '../components/heroView';
import Footer from '../components/footer';
import { useFonts } from 'expo-font';
import { Quicksand_700Bold, Quicksand_600SemiBold, Quicksand_500Medium, Quicksand_400Regular } from '@expo-google-fonts/quicksand'

export default function MainScreen() {

    useFonts({
        'Quicksand_700Bold': Quicksand_700Bold,
        'Quicksand_600SemiBold': Quicksand_600SemiBold,
        'Quicksand_500Medium': Quicksand_500Medium,
        'Quicksand_400Regular': Quicksand_400Regular
    })


    const { currencies, setCurrencies, loading, setLoading, setLastUpdate, lastUpdate } = useCurrencyStore();
    const [sortValue, setSortValue] = useState(null);
    const [error, setError] = useState(null);

    const timerId = useRef(null);
    
    const callApi = async () => {
        if (!loading) {
            clearTimeout(timerId.current)
            setLoading(true);
            try {
                const data = await fetchCurrencyRates();
                await setCurrencies(Object.values(data));
            }
            catch (err) {
                setError(err.message);
            }
            setLoading(false);
            setLastUpdate();
            timerId.current = setTimeout(callApi, 10000);
        }
    }

    useEffect(() => {
        callApi();
        return (() => clearTimeout(timerId.current));
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


    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#303030' }}>
                <Text style={{ color: '#fff', fontFamily: 'Quicksand_500Medium', textAlign: 'center' }}>{error}</Text>
                <Button title="Reload" onPress={callApi} />
            </View>
        );
    }

    return (
        <>

            {loading && currencies.length === 0 && (
                <View style={loader}>
                    <ActivityIndicator size="large" />
                </View>
            )}

            {currencies.length > 0 && (
                <>
                    <SafeAreaView style={safeArea} />
                    <SafeAreaView style={container}>
                        <HeroView lowestCurrency={lowestCurrency} highestCurrency={highestCurrency} />
                        <View style={listView}>
                            <FlatList
                                data={sortValues}
                                renderItem={({ item }) => <CurrencyListItem {...item} />}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                        <Footer loading={loading} date={lastUpdate} sorting={sorting} callApi={callApi} />
                    </SafeAreaView >
                </>
            )}
            <StatusBar style="auto" />
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
        alignItems: 'center',
        backgroundColor: '#303030'
    }
});