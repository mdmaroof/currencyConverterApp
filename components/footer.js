import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing } from "react-native";
import dayjs from 'dayjs';
import { Refresh } from "../assets/svg/refresh";
import { Sort } from "../assets/svg/sort";
import { useEffect } from "react";

const Footer = ({ date, sorting, callApi, loading }) => {
    const { footerView, button } = styles;

    const refreshButton = () => callApi();
    const sortButton = () => sorting();
    const spinValue = new Animated.Value(0);

    const animation = () => {
        return (
            Animated.loop(
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 750,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }))
        )
    }

    useEffect(() => {
        if (loading) animation().start();
    }, [loading])

    const spinValueInter = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })


    return (
        <View style={footerView}>
            <TouchableOpacity onPress={refreshButton} style={button}>
                <Animated.View style={{ transform: [{ rotate: spinValueInter }] }} >
                    <Refresh color="#5bc873" />
                </Animated.View>
            </TouchableOpacity>

            <View style={{ gap: 5, alignItems: 'center' }}>
                <Text style={{ color: '#9e9e9e' }}>Last Update</Text>
                <Text style={{ color: '#fff', fontWeight: 500, fontSize: 16 }}>
                    {dayjs(date).format('hh:mm:ss A, MMM DD')}
                </Text>
            </View>

            <TouchableOpacity onPress={sortButton} style={button}>
                <Sort color="#5bc873" />
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