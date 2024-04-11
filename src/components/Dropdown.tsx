import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import MuiIcon from "react-native-vector-icons/MaterialIcons"
import { Colors } from "../helpers/constants";

interface DataType {
    id: string | number;
    value: string
}

interface Props {
    isOpen: boolean;
    label: string;
    data: DataType[]
    handleChange: () => void;
    handleValueChange: (value:string) => void
}

export default function DropDown(props: Props) {
    const { isOpen, handleChange, data, label, handleValueChange } = props;

    const renderItem = ({ item }: { item: DataType }) => (
        <Pressable style={styles.item} onPress={() => handleValueChange(item.value)}>
            <Text>{item.value}</Text>
        </Pressable>
    );

    return (
        <View style={{ marginVertical: 8}}>
            <View style={[styles.dropDownBox, { borderWidth: isOpen ? 2 : 1 }]}>
                <Pressable onPress={handleChange} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingEnd: 2 }}>
                    <Text style={styles.textStyle} numberOfLines={1} ellipsizeMode="tail">{label}</Text>
                    {isOpen ? <MuiIcon name="keyboard-arrow-up" size={20} /> : <MuiIcon name="keyboard-arrow-down" size={20} />}
                </Pressable>
            </View>
            {isOpen &&
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    style={{maxHeight: 200, backgroundColor: Colors.white}}
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    dropDownBox: {
        padding: 14,
        width: "100%",
        borderColor: Colors.primary,
        borderRadius: 6,
        borderWidth: 1
    },
    textStyle: {
        color: Colors.black
    },
    item: {
        padding: 8,
        marginLeft: 8
    },
})