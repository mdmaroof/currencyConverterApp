import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';

const CurrencyListItem = ({ alphaCode, name, rate, date }) => {
    return (
        <View
            style={styles.item}>
            {/* <Text style={{ ...styles.text, ...styles.fontHeavy }}>{alphaCode}</Text> */}
            <Text style={{ ...styles.text, ...styles.fontHeavy }}>{name}</Text>
            <Text style={styles.text}>{rate?.toFixed(2)} {alphaCode}</Text>
            <Text style={styles.text}>{dayjs(date).format('DD MMM YYYY hh:mm A')}</Text>
        </View >
    )
}

export default CurrencyListItem;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 10,
        borderRadius: 10
    },
    text: {
        color: '#EC4207'
    },
    fontHeavy: {
        fontWeight: 700
    }
});