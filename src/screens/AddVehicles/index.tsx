import { View, SafeAreaView, StyleSheet, Text, Alert, Dimensions } from "react-native";
import { Colors, fontFamily } from "../../helpers/constants";
import { IconButton } from 'react-native-paper';
import FontAwesome from "react-native-vector-icons/FontAwesome6"
import { bikeIcon, carIcon } from "../../assets";
import { screenNames } from "../../../screenNames";
import { VehiclesRecordRealmContext } from "../../modals";

const screenWidth = Dimensions.get("screen").width;

const { useRealm } = VehiclesRecordRealmContext;


interface Props {
    navigation: any
}

export default function AddVehicles(props: Props) {
    const realm = useRealm();

    const vehicleData = realm.objects("VehiclesRecord")
    console.log(vehicleData)

    const addButton = () => (
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 80, alignItems: "center" }}>
            <View>
                <IconButton
                    icon={({ color, size }) => (
                        <FontAwesome name="plus" color={color} size={size} />
                    )}
                    size={40}
                    iconColor={Colors.primary}
                    style={styles.addButton}
                    onPress={() => {
                        props.navigation.navigate(screenNames.addVehicleForm)
                    }}
                />
            </View>
            <View>
                <Text style={{ color: "#fff", fontFamily: fontFamily.nunitoMedium }}>Add</Text>
            </View>
        </View>
    )

    const vehicleButton = (type: "Car" | "Bike", name: string) => {
        let icon = type === "Car" ? carIcon : bikeIcon;

        return (
            <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 80, alignItems: "center" }}>
                <View>
                    <IconButton
                        icon={icon}
                        size={40}
                        iconColor={Colors.primary}
                        style={styles.addButton}
                        onPress={() => {
                            Alert.alert("hi")
                        }}
                    />
                </View>
                <View>
                    <Text style={{ color: "#fff", fontFamily: fontFamily.nunitoMedium, textAlign: "center", margin: 0, padding: 0 }}>{name}</Text>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textStyle}>Add/Select Vehicle</Text>
                <View style={styles.buttonWrapper}>
                    {vehicleButton("Bike", "CB300R")}
                    {vehicleButton("Car", "Civic")}
                </View>
            </View>
                <View style={{position: "absolute", bottom: 20, right: 20}}>
                    {addButton()}
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingHorizontal: 16
    },
    textStyle: {
        fontSize: 24,
        fontFamily: fontFamily.nunitoBold,
        textAlign: "center",
        color: Colors.white,
        marginTop: 50,
        textDecorationLine: "underline",
        padding: 0,
        margin: 0
    },
    addButton: {
        backgroundColor: "#CCC",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    buttonWrapper: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: screenWidth - 50,
        marginTop: 20
    }
})