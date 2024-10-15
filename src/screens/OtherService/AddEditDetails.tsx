import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import DatePicker from "../../components/DatePicker";
import { useEffect, useState } from "react";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import CustomButton from "../../components/Button";
import { Realm } from '@realm/react'
import { VehiclesRecordRealmContext } from "../../modals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screenNames } from "../../../screenNames";
import formatDate from "../../helpers/utils";
import Toast from "react-native-toast-message";

const { useRealm } = VehiclesRecordRealmContext;

interface Props {
    navigation: any;
    route: any
}

interface VehicleData {
    _id: string
}

interface RecordData {
    _id: string;
    cost: string;
    productDetail: string;
    otherDetails: string;
}

export default function AddEditDetails(props: Props) {
    const realm = useRealm()
    const [isServiceDate, setIsServiceDate] = useState(false);
    const [serviceDate, setServiceDate] = useState(new Date());
    const [serviceDateLabel, setServiceDateLabel] = useState("Service Date");

    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null)

    const [nextService, setNextService] = useState(new Date());
    const [nextServiceLabel, setNextServiceLabel] = useState("Next expected service");
    const [isNextService, setIsNextService] = useState(false);

    const [editData, setEditData] = useState<RecordData | null>(null)

    const { control, handleSubmit, setValue } = useForm();

    const title = props.route.params.title ?? "Add Service Detail";
    //@ts-ignore
    const isEdit = props.route?.params?.isEdit === "true" ?? false;

    useEffect(() => {
        retriveVehicleData();
        updateStateData()
    }, [])

    function updateStateData() {
        if (!isEdit) return;
        try {
            const data = props.route.params?.data;
            const parsedData = JSON.parse(data) as RecordData;
            setEditData(parsedData);
            setValue("cost", parsedData.cost);
            setValue("productDetail", parsedData.productDetail);
            setValue("other", parsedData.otherDetails)
        } catch (err) {
            console.log(err)
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

    function handleDatePicker() {
        setIsServiceDate(!isServiceDate)
    }

    function getDatePickerValue(event: DateTimePickerEvent, date?: Date) {
        date && setServiceDate(date);

        const formattedDate = dayjs(date).format("DD MMM YYYY");
        setServiceDateLabel(formattedDate);
        handleDatePicker()
    }


    function getNextServiceValue(event: DateTimePickerEvent, date?: Date) {
        date && setNextService(date);

        const formattedDate = dayjs(date).format("DD MMM YYYY");
        setNextServiceLabel(formattedDate);
        handleNextService()
    }

    function handleNextService() {
        setIsNextService(!isNextService)
    }

    function createRecord(data: Record<string, string>) {
        if (!vehicleData) return;

        const { cost, other, productDetail } = data;

        // DB write
        try {
            realm.write(() => {
                realm.create("OtherService", {
                    _id: new Realm.BSON.ObjectId(),
                    createdAt: new Date(),
                    vehicleId: vehicleData?._id,
                    cost: cost,
                    otherDetails: other,
                    productDetail: productDetail
                })
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

    function editRecord(data: Record<string, string>) {
        if (!vehicleData) return;
        const { cost, other, productDetail } = data;

        try {
            const id = new Realm.BSON.ObjectId(editData?._id)
            realm.write(() => {
                const record = realm.objectForPrimaryKey("OtherService", id)
                if(record) {
                    record.updatedAt = new Date();
                    if(other) record.otherDetails = other;
                    if(cost) record.cost = cost;
                    if(productDetail) record.productDetail = productDetail
                }
            })
            Toast.show({
                type: "success",
                text1: "Record updated successfully"
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
            <Header title={title} showBackIcon onBackPress={handleBack} />
            <ScrollView style={styles.container}>

                <CustomInput
                    control={control}
                    name="productDetail"
                    label="Product Detail/Parts detail"
                />

                <CustomInput
                    control={control}
                    name="cost"
                    label="Cost"
                    rules={{ required: "Cost is required field" }}
                    keyboardType="numeric"
                />

                <CustomInput
                    control={control}
                    name="other"
                    label="Other Details"
                />

                {!isEdit ? <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center" }}>
                    <CustomButton
                        text="Cancel"
                        onPress={handleBack}
                        type="secondary"
                    />

                    <CustomButton
                        text="Add"
                        onPress={handleSubmit(createRecord)}
                        type="primary"
                    />
                </View> :
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center" }}>
                        <CustomButton
                            text="Cancel"
                            onPress={handleBack}
                            type="secondary"
                        />

                        <CustomButton
                            text="Edit"
                            onPress={handleSubmit(editRecord)}
                            type="primary"
                        />
                    </View>}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16
    }
})