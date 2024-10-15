import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import Toast from 'react-native-toast-message';
import { useEffect, useState } from "react";
import CustomButton from "../../components/Button";
import { screenNames } from "../../../screenNames";
import { VehiclesRecordRealmContext } from "../../modals";
import {Realm} from '@realm/react'
import { fontFamily } from "../../helpers/constants";

const { useRealm } = VehiclesRecordRealmContext;


interface Props {
    navigation: any
    route: any
}

interface Record {
    _id: string;
    cost: string;
    productDetail: string;
    otherDetails: string;
}

export default function ViewDetails(props: Props) {
    const realm = useRealm()

    const [serviceDetails, setServiceDetails] = useState<Record | null>(null);

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
        props.navigation.navigate(screenNames.addEditDetails, { 
            data: JSON.stringify(serviceDetails), 
            title: "Edit Details" ,
            isEdit: "true"
        })
    }

    function deleteRecord() {
        try {
            const id = new Realm.BSON.ObjectId(serviceDetails?._id)
            realm.write(() => {
                realm.delete(realm.objectForPrimaryKey("OtherService", id))
            })
            Toast.show({
                type: "success",
                text1: "Record deleted successfully"
            })
            props.navigation.navigate(screenNames.otherService)
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
                <Text style={styles.titleText}>1. Product/Parts Detail</Text>
                <Text style={styles.subText}>{serviceDetails?.productDetail}</Text>

                <Text style={styles.titleText}>2.Cost</Text>
                <Text style={styles.subText}>{serviceDetails?.cost} KM</Text>

                <Text style={styles.titleText}>3. Other Details</Text>
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
        fontFamily: fontFamily.poppinsSemiBold,
        fontSize: 16,
        marginTop: 10
    },
    subText: {
        paddingLeft: 16,
        paddingTop: 4,
        fontFamily: fontFamily.poppinsRegular
    },

})