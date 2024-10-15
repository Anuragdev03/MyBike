import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import Header from "../../components/Header";
import { IconButton } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome6"
import { Colors, fontFamily } from "../../helpers/constants";
import { screenNames } from "../../../screenNames";
import { FlatList } from "react-native";
import { useCallback, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VehiclesRecordRealmContext } from "../../modals";
import { useFocusEffect } from "@react-navigation/native";

const { useRealm } = VehiclesRecordRealmContext;

interface Props {
    navigation: any
}

interface Record {
    _id: string;
    cost: string;
    productDetail: string;
    otherDetails: string;
}

export default function OtherService(props:Props) {
    const [serviceData, setServiceData] = useState<any>(null);
    const realm = useRealm();

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    );

    async function fetchData() {
        // Get vechile id
        let data = await AsyncStorage.getItem("selectedVehicle")
        if (!data) return
        const parsedData = JSON.parse(data)
        const records = realm.objects("OtherService").filtered(`vehicleId =='${parsedData._id}'`)
        console.log(records)
        setServiceData(records)
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
                        props.navigation.navigate(screenNames.addEditDetails, { title: "Add Other service data" })
                    }}
                />
            </View>
            <View>
                <Text style={{ fontFamily: fontFamily.nunitoMedium }}>Add</Text>
            </View>
        </View>
    )

    const Card = (item: Record, index: number) => (
        <View style={styles.card}>
            <Pressable onPress={() => props.navigation.navigate(screenNames.viewDetails, {data: JSON.stringify(item)})}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                        <Text style={styles.cardText}>{index + ") " + item?.productDetail}</Text>
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
        <SafeAreaView  style={{ flex: 1 }}>
            <Header title="Other Services" showBackIcon={false} />

            <View style={styles.container}>
                <FlatList
                    data={serviceData}
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
        fontFamily: fontFamily.poppinsLight
    },
    arrowRight: {
        backgroundColor: Colors.primary,
    }
})