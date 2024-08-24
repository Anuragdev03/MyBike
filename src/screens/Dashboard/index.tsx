import { View, Text } from "react-native";
import Header from "../../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";

interface Props {
    navigation: any
    route: any
}

export default function Dashboard(props:Props) {
    const [vehicleData, setVehicleData] = useState(null)

    useEffect(() => {
        retriveVehicleData()
    }, [])

    async function retriveVehicleData() {
        let data = await AsyncStorage.getItem("selectedVehicle")
        if(!data) return
        const parsedData = JSON.parse(data)
        setVehicleData(parsedData)
    }

    function handleBack() {
        props.navigation.goBack()
    }

    
    return (
        <View>
            <Header title="Dashboard" onBackPress={handleBack} showBackIcon />
            <Text>Hello</Text>
        </View>
    )
}