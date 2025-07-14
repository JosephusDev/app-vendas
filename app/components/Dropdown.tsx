import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Filter } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';

interface IOptions {
    id: number | string;
    nome: string;
}

interface IMySelectProps {
    title: string;
    options: IOptions[];
    inputSearchVisible?: boolean;
    selected?: string | number;
    onChange?: (value: string | number) => void;
}

export default function DropdownComponent({
    title, 
    options, 
    inputSearchVisible = false,
    selected,
    onChange
}: IMySelectProps) {

    const {isDarkColorScheme} = useColorScheme()
    const [value, setValue] = useState<string>("");
    const [label, setLabel] = useState<string>("");
    const [isFocus, setIsFocus] = useState(false);

    // Sincronizar com o valor selecionado externamente
    useEffect(() => {
        if (selected) {
            const selectedOption = options.find(option => option.id.toString() === selected.toString());
            if (selectedOption) {
                setValue(selected.toString());
                setLabel(selectedOption.nome);
            }
        } else {
            setValue("");
            setLabel("");
        }
    }, [selected, options]);

    const renderLabel = () => {
        return (
            <Text className='text-muted-foreground' style={[styles.label, { backgroundColor: isDarkColorScheme ? "#18171C" : "#FFFFFF" }]}>
                {title}
            </Text>
        );
    };

    const handleChange = (item: IOptions) => {
        setValue(item.id.toString());
        setLabel(item.nome);
        setIsFocus(false);
        
        // Chamar o callback onChange se fornecido
        if (onChange) {
            onChange(item.id);
        }
    };

    return (
        <View className='mt-4 border-b-2 border-b-primary bg-background rounded-lg h-24 flex justify-end px-4 pb-5'>
            {renderLabel()}
            <Dropdown
                placeholderStyle={[styles.placeholderStyle, {color: isDarkColorScheme ? "#FFFFFF" : "#000000"}]}
                selectedTextStyle={[styles.selectedTextStyle, {color: isDarkColorScheme ? "#FFFFFF" : "#000000"}]}
                inputSearchStyle={styles.inputSearchStyle}
                data={options}
                search={inputSearchVisible}
                maxHeight={300}
                labelField="nome"
                valueField="id"
                placeholder={!isFocus ? (label || 'Selecione uma opção') : '...'}
                searchPlaceholder="Pesquisar..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={handleChange}
                renderLeftIcon={() => (
                    <Filter
                        style={styles.icon}
                        color={isDarkColorScheme ? "#FFFFFF" : "#000000"}
                        size={15}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 5,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    fontFamily: "Inter_700Bold",
  },
});