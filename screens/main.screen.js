import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { fetchCurrencyRates } from '../api/fetchCurrencyrate';
import useCurrencyStore from '../state/useCurrency.store';
import CurrencyListItem from '../components/currencyListItem';
import HeroView from '../components/heroView';
import Footer from '../components/footer';
import { useFonts } from 'expo-font';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Quicksand_700Bold, Quicksand_600SemiBold, Quicksand_500Medium, Quicksand_400Regular } from '@expo-google-fonts/quicksand'

export default function MainScreen() {

    const insets = useSafeAreaInsets();
    const safeAreaStyle = {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
    }
    useFonts({
        'Quicksand_700Bold': Quicksand_700Bold,
        'Quicksand_600SemiBold': Quicksand_600SemiBold,
        'Quicksand_500Medium': Quicksand_500Medium,
        'Quicksand_400Regular': Quicksand_400Regular
    })


    const { currencies, setCurrencies, loading, setLoading, setLastUpdate, lastUpdate, search } = useCurrencyStore();
    const [sortValue, setSortValue] = useState(null);
    const [error, setError] = useState(null);

    const timerId = useRef(null);

    const callApi = async () => {
        if (!loading) {
            try {
                clearTimeout(timerId.current)
                setLoading(true);
                const data = await fetchCurrencyRates();
                await setCurrencies(Object.values(data));
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
                setLastUpdate();
                timerId.current = setTimeout(callApi, 30000);
            }
        }
    }

    useEffect(() => {
        callApi();
        return (() => {
            if (timerId.current) {
                clearTimeout(timerId.current)
            }
        });
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
    if (sortValue === 'asc') sortValues = [...currencies].sort((a, b) => a.rate - b.rate);
    if (sortValue === 'des') sortValues = [...currencies].sort((a, b) => b.rate - a.rate);

    const { listView, container, loader, screen } = styles;

    const isSearch = search.toLowerCase().includes(search.toLowerCase());
    const searchValues = isSearch ? sortValues.filter((currency) => currency.code.toLowerCase().includes(search.toLowerCase())) : sortValues;


    if (!loading && error && currencies.length === 0) {
        return (
            <View style={{ ...styles.errorView }}>
                <Text style={{ ...styles.errorText }}>{error}</Text>
                <Button title="Reload" onPress={callApi} />
            </View>
        );
    }

    return (
        <>
            <StatusBar style="inverted" />
            {loading && currencies.length === 0 && (
                <View style={loader}>
                    <ActivityIndicator size="large" />
                </View>
            )}

            {currencies.length > 0 && (
                <View style={screen}>
                    <View style={{ height: insets.top, backgroundColor: '#5bc873' }} />
                    <View style={container}>
                        <HeroView lowestCurrency={lowestCurrency} highestCurrency={highestCurrency} />
                        <View style={listView}>
                            <FlatList
                                data={searchValues}
                                renderItem={({ item }) => <CurrencyListItem {...item} />}
                                keyExtractor={(item, index) => index}
                            />
                        </View>
                        <Footer loading={loading} date={lastUpdate} sorting={sorting} sortValue={sortValue} callApi={callApi} />
                    </View>
                    <View
                        style={{
                            height: insets.bottom,
                        }}
                    />
                </View>
            )}

        </>
    );
}

const styles = StyleSheet.create({
    errorView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#303030' },
    errorText: { color: '#fff', fontFamily: 'Quicksand_500Medium', textAlign: 'center' },
    screen: {
        flex: 1,
        backgroundColor: '#303030',
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