import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import Toast from 'react-native-toast-message';
import { useEffect, useState } from "react";
import formatDate from "../../helpers/utils";
import CustomButton from "../../components/Button";
import { screenNames } from "../../../screenNames";
import { VehiclesRecordRealmContext } from "../../modals";
import {Realm} from '@realm/react'

const { useRealm } = VehiclesRecordRealmContext;


interface Props {
    navigation: any
    route: any
}

interface ServiceRecord {
    _id: string;
    currentKm: string;
    nextService: Date;
    otherDetails: string;
    serviceDate: Date;
    serviceStation: string;
    serviceCost: string;
}

export default function ViewServiceDetail(props: Props) {
    const realm = useRealm()

    const [serviceDetails, setServiceDetails] = useState<ServiceRecord | null>(null);

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        try {
            const params = props.route.params;
            const parsedData = JSON.parse(params.data)
            setServiceDetails(parsedData)
        } catch (err) {
            console.log(err)
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Something Went Wrong!"
            })
        }
    }

    function gotoEditScreen() {
        props.navigation.navigate(screenNames.addEditServiceDetails, { 
            data: JSON.stringify(serviceDetails), 
            title: "Edit Service Details" ,
            isEdit: "true"
        })
    }

    function deleteRecord() {
        try {
            const id = new Realm.BSON.ObjectId(serviceDetails?._id)
            realm.write(() => {
                realm.delete(realm.objectForPrimaryKey("ServiceData", id))
            })
            props.navigation.navigate(screenNames.serviceDetails)
        } catch (err) {
            console.log(err)
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Something Went Wrong!"
            })
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="View Service Details" onBackPress={() => props.navigation.goBack()} showBackIcon />

            <View style={styles.container}>
                <Text style={styles.titleText}>1. Service Station</Text>
                <Text style={styles.subText}>{serviceDetails?.serviceStation}</Text>

                <Text style={styles.titleText}>2. Odometer Reading</Text>
                <Text style={styles.subText}>{serviceDetails?.currentKm} KM</Text>

                <Text style={styles.titleText}>3. Service Date</Text>
                <Text style={styles.subText}>{formatDate(serviceDetails?.serviceDate)}</Text>

                <Text style={styles.titleText}>4. Service Cost</Text>
                <Text style={styles.subText}>{serviceDetails?.serviceCost}</Text>

                <Text style={styles.titleText}>5. Next Expected Service Date</Text>
                <Text style={styles.subText}>{formatDate(serviceDetails?.nextService)}</Text>

                <Text style={styles.titleText}>6. Other Details</Text>
                <Text style={styles.subText}>{serviceDetails?.otherDetails}</Text>

                <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center", marginTop: 20 }}>
                    <CustomButton
                        text="Delete Record"
                        onPress={deleteRecord}
                        type="danger"
                    />

                    <CustomButton
                        text="Edit Record"
                        onPress={gotoEditScreen}
                        type="primary"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 16
    },
    titleText: {
        fontWeight: "bold",
        fontSize: 16,
        marginTop: 10
    },
    subText: {
        paddingLeft: 16,
        paddingTop: 4
    },

})