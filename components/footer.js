import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import dayjs from 'dayjs';
import { Refresh } from "../assets/svg/refresh";
import { Setting } from "../assets/svg/setting";

const Footer = ({ date }) => {
    const { footerView, button } = styles;
    const refreshButton = () => {
        Alert.alert('hello')
    }

    return (
        <View style={footerView}>
            <TouchableOpacity onPress={refreshButton} style={button}>
                <Refresh color="#5bc873" />
            </TouchableOpacity>

            <View style={{ gap: 5, alignItems: 'center' }}>
                <Text style={{ color: '#9e9e9e' }}>Last Update</Text>
                <Text style={{ color: '#fff', fontWeight: 500, fontSize: 16 }}>
                    {dayjs(date).format('hh:mm:ss A, MMM DD')}
                </Text>
            </View>

            <TouchableOpacity onPress={refreshButton} style={button}>
                <Setting color="#5bc873" />
            </TouchableOpacity>

        </View>
    )
}

export default Footer;

const styles = StyleSheet.create({
    footerView: {
        backgroundColor: '#303030',
        borderTopWidth: 1,
        borderTopColor: '#5bc873',
        paddingHorizontal: 20,
        paddingVertical: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#454545'
    }
})