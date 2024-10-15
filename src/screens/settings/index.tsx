import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import Header from "../../components/Header";
import { Colors, fontFamily } from "../../helpers/constants";
import Toast from "react-native-toast-message";
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import { VehiclesRecordRealmContext } from "../../modals";

const { useRealm } = VehiclesRecordRealmContext;

interface Props {
    navigation: any
}

export default function Settings(props: Props) {
    const realm = useRealm();

    const line = () => (
        <View style={styles.line} />
    )

    
    const backupRealm = async () => {
        try {
            // Source file (Realm file)
            const realmFilePath = realm.path;

            // Destination path (backup location)
            const backupFilePath = RNFS.DownloadDirectoryPath + "/backup.realm"; // Or use RNFS.DocumentDirectoryPath

            // Copy the realm file to backup location
            await RNFS.copyFile(realmFilePath, backupFilePath);

            Toast.show({
                type: "success",
                text1: "Backup stored in the downloads folder"
            })

        } catch (error) {
            console.error("Error backing up realm file: ", error);
        }
    };

    const restoreRealm = async () => {
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles, ],
            });

            const backupPath = results[0].uri;
            const realmPath = realm.path;

            await RNFS.copyFile(backupPath, realmPath);
            
            Toast.show({
                type: "success",
                text1: "Restore successful. Please re-open the app"
            })
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Settings" showBackIcon={true} onBackPress={() => props.navigation.goBack()} />

            <View style={styles.container}>
                <View style={{marginVertical: 16}}>
                    <Pressable onPress={backupRealm}>
                        <Text style={styles.buttonText}>1. Backup Data</Text>
                    </Pressable>
                    {line()}
                    <Pressable onPress={restoreRealm}>
                        <Text style={styles.buttonText}>2. Restore Data</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        position: "relative"
    },
    line: {
        borderWidth: 1,
        borderBottomColor: Colors.primary,
        opacity: .2,
        marginVertical: 8
    },
    buttonText: {
        fontFamily: fontFamily.poppinsMedium
    }
})