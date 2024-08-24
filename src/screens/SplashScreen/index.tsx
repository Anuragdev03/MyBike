import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../helpers/constants";
import { useEffect } from "react";
import { screenNames } from "../../../screenNames";

interface Props {
    navigation: any
}

export default function SplashScreen(props: Props) {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate(screenNames.addVehicleScreen)
        }, 1000);
    },[])
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>MyVahan</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary
    },
    textStyle: {
        color: Colors.white, 
        textAlign: "center", 
        fontSize: 45, 
        fontFamily: "Nunito-Bold"
    }
})