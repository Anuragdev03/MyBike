import { Pressable, StyleSheet, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Text } from "react-native-paper";
import MuiIcons from "react-native-vector-icons/MaterialIcons"
import { Colors } from "../helpers/constants";

interface Props {
    isOpen: boolean;
    handleDateChange: (event: DateTimePickerEvent, date?: Date) => void;
    handleChange: () => void;
    value: Date;
    labelValue?: string;
    minDate?: Date
}

export default function DatePicker(props: Props) {
    const { isOpen, handleChange, handleDateChange, labelValue, value, minDate } = props;


    return (
        <View style={{marginVertical: 4}}>
            <Pressable onPress={handleChange} style={styles.textWrapper}>
                <Text>
                    {labelValue ? labelValue : "Select Date"}
                </Text>
                <MuiIcons name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"} />
            </Pressable>
            {isOpen && 
                <DateTimePicker value={value}  onChange={handleDateChange} minimumDate={minDate} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary,
        flexDirection: "row",
        paddingVertical: 14,
        paddingHorizontal: 14,
        backgroundColor: Colors.white,
    }
})