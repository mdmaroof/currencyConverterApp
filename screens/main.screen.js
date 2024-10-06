import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { fetchCurrencyRates } from '../api/fetchCurrencyrate';

export default function MainScreen() {

    const callApi = async () => {
        const res = await fetchCurrencyRates();
        console.log(res)
    }

    useEffect(() => {
        callApi()
    }, [])
    return (
        <SafeAreaView style={styles.container}>

            <View style={{ backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10, width: '95%', flexDirection: 'column', gap: 8, borderRadius: 5 }}>
                <Text style={{ color: '#fff', fontSize: 30, fontWeight: 600 }}>Switzerland</Text>
                <Text style={{ color: '#fff', fontSize: 20 }}>Swiss Franc</Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>0.85385296858714</Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>Fri, 4 Oct 2024 23:59:00</Text>
            </View>

            <View style={{ backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10, width: '95%', flexDirection: 'column', gap: 8, borderRadius: 5 }}>
                <Text style={{ color: '#fff', fontSize: 30, fontWeight: 600 }}>Switzerland</Text>
                <Text style={{ color: '#fff', fontSize: 20 }}>Swiss Franc</Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>0.85385296858714</Text>
                <Text style={{ color: '#fff', fontSize: 18 }}>Fri, 4 Oct 2024 23:59:00</Text>
            </View>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
});
