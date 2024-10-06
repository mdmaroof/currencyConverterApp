import { StyleSheet, Text, View } from "react-native";
import Arrow from "../assets/svg/arrow";

const Card = ({ alphaCode, rate, name, low }) => {
    const { card, cardHeading1, cardHeading2, textColorGray, higlightText } = styles;
    return (
        <View style={{ ...card, flexDirection: 'row', overflow: 'hidden' }}>
            <View style={{ gap: 2, flex: 1, justifyContent: 'center' }}>
                <Text style={{ ...cardHeading1 }}>{alphaCode} {rate?.toFixed(2)}</Text>
                <Text style={{ ...cardHeading2, ...textColorGray }}>{name}</Text>
            </View>
            <View style={{ transform: [{ rotate: low && '0deg' || '180deg' }], opacity: 0.9 }}>
                <Arrow color={low && "#ff0000" || "#008000"} />
            </View>

            <Text style={{ ...higlightText }}>{low && 'Lowest' || 'Highest'}</Text>
        </View>
    )
}
const HeroView = ({ highestCurrency, lowestCurrency }) => {
    const { heroUi, heroView, title, titleBlock } = styles;
    return (
        <View style={heroView}>
            <View style={{ ...titleBlock }}>
                <Text style={{ ...title }}>Currency Conversion's of USD</Text>
            </View>

            <View style={{ ...heroUi }}>
                <Card {...highestCurrency} />
                <Card {...lowestCurrency} low={true} />
            </View>
        </View>
    )
}

export default HeroView;

const styles = StyleSheet.create({
    heroView: {
        backgroundColor: '#5bc873',
        paddingHorizontal: 10,
        paddingVertical: 20,
        gap: 15,
        flexDirection: 'column'
    },
    heroUi: {
        flexDirection: 'row',
        gap: 10
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
    },
    titleBlock: {
        borderBottomWidth: 1,
        paddingBottom: 5,
        borderBottomColor: '#fff'
    },
    title: {
        fontWeight: 700,
        fontSize: 20,
        color: '#fff'
    }
})