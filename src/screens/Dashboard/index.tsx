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
    const [serviceCost, setServiceCost] = useState("0");
    const [otherServiceCost, setOtherServiceCost] = useState("0");

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
        const vehicleList = realm.objects("ServiceData").filtered(`vehicleId =='${parsedData._id}'`);
        let totalServiceCost = vehicleList.reduce((acc, obj) => acc + Number(obj.serviceCost), 0)

        const otherServiceList = realm.objects("OtherService").filtered(`vehicleId =='${parsedData._id}'`);
        const totalOtherServiceCost = otherServiceList.reduce((acc, obj) => acc + Number(obj.cost), 0)

        const accumulatedCost = totalServiceCost + totalOtherServiceCost

        setCost(accumulatedCost.toString());
        setServiceCost(totalServiceCost.toString());
        setOtherServiceCost(totalOtherServiceCost.toString())
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

                <View style={styles.card}>
                    <Text style={styles.headerText}>Total Service Cost</Text>
                    <Text style={styles.cost}>{serviceCost}</Text>
                </View>

                <View style={[styles.card, {height: 185}]}>
                    <Text style={styles.headerText}>Total Other Service Cost</Text>
                    <Text style={styles.cost}>{otherServiceCost}</Text>
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