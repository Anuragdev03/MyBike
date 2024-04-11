import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import { View, StyleSheet, Text, KeyboardType } from "react-native";
import { TextInput } from 'react-native-paper';
import { Colors, fontFamily } from "../helpers/constants";

interface Props {
    name: string;
    control: Control<FieldValues>
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardType;
    rules?: any;
    label: string;
}

const CustomInput = ({
    name,
    control,
    placeholder,
    secureTextEntry,
    keyboardType,
    rules = {},
    label
}: Props) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { value, onChange },
                fieldState: { error },
            }) => (
                <>
                    <TextInput
                        label={label}
                        placeholder={placeholder}
                        selectionColor={Colors.primary}
                        underlineColor={Colors.primary}
                        mode="outlined"
                        outlineStyle={{ borderColor: Colors.primary }}
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry={secureTextEntry}
                        keyboardType={keyboardType}
                        style={{marginVertical: 8}}

                    />
                    {error && (<Text style={{ color: Colors.red }}>{error?.message ? error?.message : `Error in ${name} field.`}</Text>)}
                </>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default CustomInput;
