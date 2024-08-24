import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { IconButton } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome6"
import { Colors, fontFamily } from "../../helpers/constants";
import { screenNames } from "../../../screenNames";
import { SafeAreaView } from "react-native-safe-area-context";
import { VehiclesRecordRealmContext } from "../../modals";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { useRealm } = VehiclesRecordRealmContext;

interface Props {
    navigation: any
}

interface VehicleData {
    _id: string
}

export default function ServiceDetails(props: Props) {
    const realm = useRealm();
    const [serviceRecord, setServiceRecord] = useState<any>(null)
    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

    useEffect(() => {
        retriveVehicleData()
    }, [])

    async function retriveVehicleData() {
        let data = await AsyncStorage.getItem("selectedVehicle")
        if (!data) return
        const parsedData = JSON.parse(data)
        setVehicleData(parsedData)
        fetchServiceRecord()
    }

    function fetchServiceRecord() {
        if (!vehicleData) return;
        try {
            const data = realm.objects("ServiceData").filtered(`vehicleId =='${vehicleData._id}'`)
            setServiceRecord(data)
        } catch (err) {
            console.log(err)
        }
    }

    const addButton = () => (
        <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: 80, alignItems: "center" }}>
            <View>
                <IconButton
                    icon={({ color, size }) => (
                        <FontAwesome name="plus" color={color} size={size} />
                    )}
                    size={30}
                    iconColor={Colors.white}
                    style={styles.addButton}
                    onPress={() => {
                        props.navigation.navigate(screenNames.addEditServiceDetails, { title: "Add Service Detail" })
                    }}
                />
            </View>
            <View>
                <Text style={{ fontFamily: fontFamily.nunitoMedium }}>Add</Text>
            </View>
        </View>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Service Details" showBackIcon={false} />
            <View style={styles.container}>
                <Text style={{ height: 50 }}>
                    TExting
                </Text>
                <Text style={{ height: 50 }}>
                    TExting
                </Text>
                <Text style={{ height: 50 }}>
                    TExting
                </Text>
                <Text style={{ height: 50 }}>
                    TExting
                </Text>

                <Text style={{ height: 50 }}>
                    TExting
                </Text>

            </View>
            <View style={{ position: "absolute", right: 10, bottom: 0 }}>
                {addButton()}
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        position: "relative"
    },

    addButton: {
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
})