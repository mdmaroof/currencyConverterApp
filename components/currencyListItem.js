import dayjs from 'dayjs';
import { StyleSheet, Text, View } from 'react-native';

const CurrencyListItem = ({ alphaCode, name, rate, code, numericCode, date }) => {
    const { item, textGray, textPrimary, textWhite, fontSizeLg, fontHeavy, higlightText } = styles;
    return (
        <View style={{ ...item }}>
            <View>
                <Text style={{ ...textWhite, ...fontSizeLg }}>{code}</Text>
                <Text style={{ ...textWhite, fontFamily: 'Quicksand_600SemiBold', fontSize: 10 }}>
                    as of {dayjs(date).format('MMM DD, hh:mm A ')}
                </Text>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
                <Text style={{ ...textPrimary, ...fontSizeLg, ...fontHeavy }}>{rate?.toFixed(2)} {alphaCode}</Text>
                <Text numberOfLines={1} style={{ ...textGray, ...fontHeavy, }}>{name}</Text>
            </View>
            <Text style={{ ...higlightText }}>
                {numericCode}
            </Text>
        </View>


    )
}

export default CurrencyListItem;

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#454545',
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#5bc873',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        gap: 5
    },
    textGray: {
        color: '#9e9e9e'
    },
    textWhite: {
        color: '#fff'
    },
    textPrimary: {
        color: '#5bc873'
    },
    fontHeavy: {
        fontFamily: 'Quicksand_700Bold',
    },
    fontSizeLg: {
        fontFamily: 'Quicksand_700Bold',
        fontSize: 24,
    },
    higlightText: {
        position: 'absolute',
        fontSize: 100,
        fontWeight: 700,
        left: 5,
        zIndex: -1,
        color: '#5bc873',
        opacity: 0.15
    },
});