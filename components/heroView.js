import { StyleSheet, Text, View } from "react-native";
import Arrow from "../assets/svg/arrow";
import { isAndroid } from "../helper/platform";

const Card = ({ alphaCode, rate, name, low }) => {
    const { card, cardHeading1, cardHeading2, higlightText } = styles;
    return (
        <View style={{ ...card, flexDirection: 'row', overflow: 'hidden', flex: 1 }}>
            <View style={{ gap: 2, flex: 1, justifyContent: 'center' }}>
                <Text style={{ ...cardHeading2, }}>{name}</Text>
                <View style={{ flexDirection: 'row', gap: 2, alignItems: 'flex-end' }}>
                    <Text style={{ ...cardHeading1 }}>{rate?.toFixed(2)}</Text>
                    <Text style={{ ...cardHeading1, fontSize: 12,marginBottom:2 }}>{alphaCode}</Text>
                </View>
            </View>
            <View style={{ transform: [{ rotate: low && '0deg' || '180deg' }], height: 30 }}>
                <Arrow color={"#5bc873"} />
            </View>

            <Text style={{ ...higlightText }}>{low && 'Lowest' || 'Highest'}</Text>
        </View>
    )
}
const HeroView = ({ highestCurrency, lowestCurrency }) => {
    const { heroUi, heroView, title, titleBlock } = styles;

    return (
        <View style={{ ...heroView }}>
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
        paddingBottom: 35,
        gap: 15,
        flexDirection: 'column'
    },
    heroUi: {
        flexDirection: 'row',
        gap: 10
    },
    card: {
        backgroundColor: '#454545',
        paddingHorizontal: 10,
        paddingVertical: 15,
        flex: 1,
        borderRadius: 10,
        gap: 5,
        alignItems: 'flex-end'
    },
    cardHeading1: {
        fontFamily: 'Quicksand_700Bold',
        fontSize: isAndroid ? 16 : 18,
        color: '#5bc873',
    },
    cardHeading2: {
        fontSize: 12,
        fontFamily: 'Quicksand_400Regular',
        color: '#fff',
    },
    higlightText: {
        position: 'absolute',
        fontSize: 30,
        fontWeight: 700,
        top: 5,
        right: 5,
        zIndex: -1,
        color: '#efefef',
        opacity: 0.1
    },
    titleBlock: {
        borderBottomWidth: 1,
        marginTop: isAndroid ? 25 : 0,
        paddingBottom: 5,
        borderBottomColor: '#fff'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Quicksand_700Bold'
    }
})