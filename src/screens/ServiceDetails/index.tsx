import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
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
import formatDate from "../../helpers/utils";

const { useRealm } = VehiclesRecordRealmContext;

interface Props {
    navigation: any
}

interface VehicleData {
    _id: string
}

interface ServiceRecord {
    _id: string;
    currentKm: string;
    nextService: Date;
    otherDetails: string;
    serviceDate: Date;
    serviceStation: string;
}


export default function ServiceDetails(props: Props) {
    const realm = useRealm();
    const [serviceRecord, setServiceRecord] = useState<any>(null)
    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);

    useFocusEffect(
        useCallback(() => {
            retriveVehicleData()
        }, [])
    );

    async function retriveVehicleData() {
        let data = await AsyncStorage.getItem("selectedVehicle")
        if (!data) return
        const parsedData = JSON.parse(data)
        setVehicleData(parsedData)
        fetchServiceRecord(parsedData)
    }

    function fetchServiceRecord(vehicleData: any) {
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

    const Card = (item: ServiceRecord, index: number) => (
        <View style={styles.card}>
            <Pressable onPress={() => props.navigation.navigate(screenNames.ViewServiceDetail, {data: JSON.stringify(item)})}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={styles.cardText}>{index + ") " + item?.serviceStation + " - " + formatDate(item.serviceDate)} Km</Text>
                    </View>
                    <IconButton
                        icon={({ color, size }) => (
                            <FontAwesome name="chevron-right" color={color} size={size} />
                        )}
                        size={20}
                        iconColor={Colors.white}
                        style={styles.arrowRight}
                    />
                </View>
            </Pressable>
        </View>
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Service Details" showBackIcon={false} />
            <View style={styles.container}>
                <FlatList
                    data={serviceRecord}
                    keyExtractor={item => item._id}
                    renderItem={(({ item, index }) => Card(item, index + 1))}
                />
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

    arrowRight: {
        backgroundColor: Colors.primary,
    },

    card: {
        backgroundColor: Colors.primary,
        height: 50,
        marginTop: 10,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        padding: 8,
    },

    cardText: {
        color: Colors.white,
        fontWeight: "500",
        fontSize: 16,
    },
    date: {
        color: Colors.white,
        maxWidth: 150
    }
})