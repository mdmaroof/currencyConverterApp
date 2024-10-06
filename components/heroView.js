import { StyleSheet, Text, View } from "react-native";
import Arrow from "../assets/svg/arrow";


const Card = ({ alphaCode, rate, name, low }) => {
    return (
        <View style={{ ...styles.card, flexDirection: 'row', overflow: 'hidden' }}>
            <View style={{ gap: 2, flex: 1, justifyContent: 'center' }}>
                <Text style={{ ...styles.cardHeading1 }}>{alphaCode} {rate?.toFixed(2)}</Text>
                <Text style={{ ...styles.cardHeading2, ...styles.textColorGray }}>{name}</Text>
            </View>
            <View style={{ transform: [{ rotate: low && '0deg' || '180deg' }], opacity: 0.9 }}>
                <Arrow color={low && "#ff0000" || "#008000"} />
            </View>

            <Text style={{...styles.higlightText}}>{low && 'Lowest' || 'Highest'}</Text>
        </View>
    )
}
const HeroView = ({ highestCurrency, lowestCurrency }) => {
    return (
        <View style={styles.heroView}>
            <Card {...highestCurrency} />
            <Card {...lowestCurrency} low={true} />
        </View>
    )
}

export default HeroView;

const styles = StyleSheet.create({
    heroView: {
        backgroundColor: '#5bc873',
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginBottom: 10
    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        flex: 1,
        borderRadius: 10,
        gap: 5
    },
    cardHeading1: {
        fontWeight: 700,
        fontSize: 14,
    },
    cardHeading2: {
        fontSize: 12,
    },
    textColorGray: {
        color: '#717171',
    },
    higlightText: {
        position: 'absolute',
        fontSize: 30,
        fontWeight: 700,
        bottom: 5,
        left: 5,
        zIndex: -1,
        color: '#f1f1f1',
        opacity: '0.75'
    }
})