import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import DatePicker from "../../components/DatePicker";
import { useEffect, useState } from "react";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import CustomButton from "../../components/Button";
import { Realm, useObject } from '@realm/react'
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

interface ServiceRecord {
    _id: string;
    currentKm: string;
    nextService: Date;
    otherDetails: string;
    serviceDate: Date;
    serviceStation: string;
    serviceCost: string;
}

export default function AddEditServiceDetails(props: Props) {
    const realm = useRealm()
    const [isServiceDate, setIsServiceDate] = useState(false);
    const [serviceDate, setServiceDate] = useState(new Date());
    const [serviceDateLabel, setServiceDateLabel] = useState("Service Date");

    const [vehicleData, setVehicleData] = useState<VehicleData | null>(null)

    const [nextService, setNextService] = useState(new Date());
    const [nextServiceLabel, setNextServiceLabel] = useState("Next expected service");
    const [isNextService, setIsNextService] = useState(false);

    const [editData, setEditData] = useState<ServiceRecord | null>(null)

    const { control, handleSubmit, setValue } = useForm();

    const title = props.route.params.title ?? "Add Service Detail";
    const isEdit = props.route.params?.isEdit === "true" ?? false;

    useEffect(() => {
        retriveVehicleData();
        updateStateData()
    }, [])

    function updateStateData() {
        if (!isEdit) return;
        try {
            const data = props.route.params?.data;
            const parsedData = JSON.parse(data) as ServiceRecord;
            setEditData(parsedData);
            setValue("serviceStation", parsedData.serviceStation);
            setValue("serviceCost", parsedData.serviceCost);
            setValue("currentKm", parsedData.currentKm);
            setValue("other", parsedData.otherDetails);
            setServiceDate(new Date(parsedData.serviceDate));
            setNextService(new Date(parsedData.nextService));

            setServiceDateLabel(formatDate(new Date(parsedData.serviceDate)));
            setNextServiceLabel(formatDate(new Date(parsedData.nextService)))
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

        const { serviceStation, serviceCost, currentKm, other } = data;

        // DB write
        try {
            realm.write(() => {
                realm.create("ServiceData", {
                    _id: new Realm.BSON.ObjectId(),
                    createdAt: new Date(),
                    vehicleId: vehicleData?._id,
                    currentKm: currentKm,
                    serviceStation: serviceStation,
                    serviceCost: serviceCost,
                    otherDetails: other,
                    serviceDate: serviceDate,
                    nextService: nextService
                })
            })
            updateTotalCost(serviceCost);
        } catch (err) {
            console.log(err)
        }
        props.navigation.navigate(screenNames.serviceDetails)
    }

    function editRecord(data: Record<string, string>) {
        if (!vehicleData) return;
        const { serviceStation, serviceCost, currentKm, other } = data;

        try {
            const id = new Realm.BSON.ObjectId(editData?._id)
            realm.write(() => {
                const record = realm.objectForPrimaryKey("ServiceData", id)
                if(record) {
                    record.updatedAt = new Date();
                    if(currentKm) record.currentKm = currentKm;
                    if(serviceStation) record.serviceStation = serviceStation;
                    if(serviceCost) record.serviceCost = serviceCost;
                    if(other) record.otherDetails = other;
                    if(serviceDate) record.serviceDate = serviceDate;
                    if(nextService) record.nextService = nextService
                }
            })
            Toast.show({
                type: "success",
                text1: "Record updated successfully"
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

    async function updateTotalCost(amount: string) {
        const vehicleData = await AsyncStorage.getItem("selectedVehicle");
        if (!vehicleData) return
        const parsedData = JSON.parse(vehicleData);
        const vehicleID = parsedData?._id;
        const totalCost = realm.objects("TotalCost").filtered(`vehicleId =='${parsedData._id}'`)

        if(totalCost.length) {

        } else {
            try {
                realm.write(() => {
                    realm.create("TotalCost", {
                        _id: new Realm.BSON.ObjectId(),
                        vehicleId: vehicleID,
                        totalCost: amount,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })
                })
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={title} showBackIcon onBackPress={handleBack} />
            <ScrollView style={styles.container}>
                <CustomInput
                    control={control}
                    name="serviceStation"
                    label="Service Station/place/name"
                    rules={{ required: "Service station details required" }}
                />

                <DatePicker
                    isOpen={isServiceDate}
                    handleChange={handleDatePicker}
                    handleDateChange={getDatePickerValue}
                    value={serviceDate}
                    labelValue={serviceDateLabel}
                />

                <CustomInput
                    control={control}
                    name="serviceCost"
                    label="Service Cost"
                    rules={{ required: "Service cost required" }}
                    keyboardType="numeric"
                />

                <DatePicker
                    isOpen={isNextService}
                    handleChange={handleNextService}
                    handleDateChange={getNextServiceValue}
                    value={nextService}
                    labelValue={nextServiceLabel}
                    minDate={new Date()}
                />

                <CustomInput
                    control={control}
                    name="currentKm"
                    label="Current Odometer reading"
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