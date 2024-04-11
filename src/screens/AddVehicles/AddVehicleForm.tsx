import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import DropDown from "../../components/Dropdown";
import { useState } from "react";
import CustomButton from "../../components/Button";
import { VehiclesRecordRealmContext } from "../../modals/index";

const { useRealm } = VehiclesRecordRealmContext;
interface Props {
    navigation: any
}

export default function AddVehicleForm(props: Props) {
    const { control, handleSubmit } = useForm();
    const realm = useRealm();
    const [isOpen, setIsOpen] = useState(false);
    const [vehicleTypeValue, setVehicleType] = useState("");

    function handleVehicleTypeValueChange(val: string) {
        setVehicleType(val);
        setIsOpen(false)
    }

    function handleBack() {
        props.navigation.goBack()
    }

    function createRecord(data: any) {
        console.log(data)
        if(!vehicleTypeValue) return;

        realm.write(() => {
            realm.create("VehiclesRecord",{
                vehicleName: data?.vehicleName,
                brandName: data?.brandName,
                vehicleType: vehicleTypeValue,
            })
        })
    }

    const vehicleType = [
        { id: '1', value: 'Bike' },
        { id: '2', value: 'Car' },
        { id: '3', value: 'Other' },
    ]
    return (
        <View>
            <Header title="Add Vehicle Details" onBackPress={handleBack} />

            <View style={styles.wrapper}>
                <CustomInput
                    label="Vehicle Name"
                    name="vehicleName"
                    control={control}
                    rules={{ required: "Vehicle name is required" }}
                />

                <CustomInput
                    label="Brand Name"
                    name="brandName"
                    control={control}
                    rules={{ required: "Vehicle name is required" }}
                />

                <DropDown
                    isOpen={isOpen}
                    data={vehicleType}
                    label={vehicleTypeValue ? vehicleTypeValue : "Vehicle Type"}
                    handleChange={() => { setIsOpen(!isOpen) }}
                    handleValueChange={handleVehicleTypeValueChange}
                />

                <View style={{display: "flex", flexDirection: "row", gap: 8, justifyContent: "center"}}>
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
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginHorizontal: 16,
        marginTop: 30
    }
})