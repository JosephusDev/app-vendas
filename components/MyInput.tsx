import { Input } from "./ui/input";
import { View, TextInputProps } from "react-native";

interface MyInputProps extends TextInputProps {
    dica?: string;
    aoMudarTexto?: () => void
}

export default function MyInput({
    dica = 'Pesquisar...',
    aoMudarTexto,
    ...rest
}: MyInputProps) {
    return (
        <View className="flex justify-center items-center w-full">
            <Input
                className="w-full mt-5 border-0 border-b-2 border-primary"
                placeholder={dica}
                onChangeText={aoMudarTexto}
                {...rest}
            />
        </View>
    );
}
