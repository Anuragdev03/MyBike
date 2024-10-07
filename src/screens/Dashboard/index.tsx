import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from "react";
import { VehiclesRecordRealmContext } from "../../modals";
import { useFocusEffect } from "@react-navigation/native";
import { Colors, fontFamily } from "../../helpers/constants";

const { useRealm } = VehiclesRecordRealmContext;

interface Props {
    navigation: any
    route: any
}

export default function Dashboard(props: Props) {
    const realm = useRealm();

    const [vehicleData, setVehicleData] = useState(null);
    const [cost, setCost] = useState("0");

    useEffect(() => {
        retriveVehicleData();
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchTotalCost()
        }, [])
    );

    async function fetchTotalCost() {
        let data = await AsyncStorage.getItem("selectedVehicle")
        if (!data) return
        const parsedData = JSON.parse(data)
        const totalCost = realm.objects("TotalCost").filtered(`vehicleId =='${parsedData._id}'`)
        if (totalCost.length === 1) {
            let cost = totalCost[0].totalCost as string;
            cost && setCost(cost)
        }
    }

    async function retriveVehicleData() {
        let data = await AsyncStorage.getItem("selectedVehicle")
        if (!data) return
        const parsedData = JSON.parse(data)
        setVehicleData(parsedData)
    }

    function handleBack() {
        props.navigation.goBack()
    }

    return (
        <View>
            <Header title="Dashboard" onBackPress={handleBack} showBackIcon />
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.headerText}>Total Cost</Text>
                    <Text style={styles.cost}>{cost}</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        height: 150,
        backgroundColor: Colors.primary,
        borderRadius: 8,
        marginVertical: 8
    },
    container: {
        marginHorizontal: 16
    },
    headerText: {
        fontSize: 30,
        color: "#FFF",
        margin: 16,
        fontFamily: fontFamily.poppinsLight
    },
    cost: {
        fontSize: 30,
        color: "#FFF",
        margin: 16,
        fontFamily: fontFamily.poppinsLight
    }
})