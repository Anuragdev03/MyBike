import { View, Text, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome6"
import { Colors, fontFamily } from "../helpers/constants";
import { IconButton } from "react-native-paper";

// Types
interface Props {
    title: string;
    onBackPress: () => void
}
export default function Header(props: Props) {
    const { title, onBackPress } = props;

    return (
        <View style={styles.container}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center"}}>
                <IconButton onPress={onBackPress} style={styles.backIcon} icon={() => (
                    <FontAwesome name="arrow-left" color={"#fff"} size={25} />
                )}
                />
                <Text style={styles.textStyle}>{title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: Colors.primary,
    },
    textStyle: {
        fontSize: 22,
        fontFamily: fontFamily.nunitoBold,
        color: Colors.white,
    },
    backIcon: {
        position: "absolute",
        left: 0
    }
})
