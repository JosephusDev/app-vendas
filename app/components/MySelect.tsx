import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '~/lib/useColorScheme';

interface IOptions {
    id: number | string;
    nome: string;
}
interface IMySelectProps {
    title: string;
    options: IOptions[];
    selected: string | number | undefined;
    onChange: (value: string | number) => void;
}



export default function MySelect({title, options, selected, onChange}:IMySelectProps) {
    const [selectedCategory, setSelectedCategory] = useState(selected);
    const { isDarkColorScheme } = useColorScheme();

    return (
        <View className='mt-4 border-b-2 border-b-primary bg-background rounded-lg h-12 flex justify-center' style={[styles.pickerContainer, isDarkColorScheme && styles.darkPickerContainer]}>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => {
                    setSelectedCategory(itemValue);
                    onChange(itemValue);
                }}
                style={{color: isDarkColorScheme ? '#FFFFFF' : '#000000'}}
                dropdownIconColor={isDarkColorScheme ? '#FFFFFF' : '#000000'}
            >
                <Picker.Item label={title} enabled={false} />
                {
                    options.map((option) => (
                        <Picker.Item key={option.nome} label={option.nome} value={option.id} />
                    ))
                }
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: '#FFFFFF',
    },
    darkPickerContainer: {
        backgroundColor: '#18171C',
    },
});
