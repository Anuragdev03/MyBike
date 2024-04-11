import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { Colors } from "../helpers/constants";

interface Props {
    text: string;
    type: "primary" | "secondary" | "danger";
    onPress: () => void;
}

type ButtonType = "text" | "contained" | "outlined" | "elevated" | "contained-tonal" | undefined

export default function CustomButton(props: Props) {
    const { text, type, onPress } = props;
    let btnType: ButtonType = "text";
    switch(type) {
        case "primary":
            btnType = "contained";
            break;
        case "secondary":
            btnType = "outlined";
            break;
        case "danger":
            btnType = "contained";
            break;
        default:
            btnType = "text"
    }

    let buttonColor = "";
    switch(type) {
        case "primary":
            buttonColor = Colors.primary;
            break;
        case "secondary":
            buttonColor = "";
            break;
        case "danger":
            buttonColor = Colors.red;
            break
        default: 
            buttonColor = ""
    }
    return (
        <View>
            <Button mode={btnType} style={styles.generalStyle} onPress={onPress} buttonColor={buttonColor}>
                {text}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    generalStyle: {
        minWidth: 90,
        marginVertical: 8
    }
})