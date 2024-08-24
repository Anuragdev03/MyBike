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
import { Realm } from '@realm/react'
import { VehiclesRecordRealmContext } from "../../modals/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screenNames } from "../../../screenNames";

const { useRealm } = VehiclesRecordRealmContext;

interface Props {
    navigation: any;
    route: any
}

interface VehicleData {
    _id: string
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

    const { control, handleSubmit } = useForm();

    const title = props.route.params.title ?? "Add Service Detail";

    useEffect(() => {
        retriveVehicleData()
    }, [])

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
        } catch (err) {
            console.log(err)
        }
        props.navigation.navigate(screenNames.serviceDetails)
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

                <View style={{ display: "flex", flexDirection: "row", gap: 8, justifyContent: "center" }}>
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
                </View>
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