import { Modal, View } from "react-native";
import { Text } from "./ui/text";
import { Button } from "./ui/button";
import { CheckCircle, XCircle } from "lucide-react-native";

interface MyModalProps {
    title?: string;
    children: React.ReactNode;
    visivel: boolean;
    aoFechar: () => void;
    aoConfirmar: () => void;
}

export default function MyModal({ title = 'Adicionar', children, visivel, aoFechar, aoConfirmar }: MyModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visivel}
        >
            <View className="absolute inset-0 bg-black bg-opacity-80" />
            <View className="flex-1 justify-center items-center">
                <View className="bg-background w-5/6 rounded-lg shadow-2xl p-5 h-auto">
                    <Text className="text-lg mb-4">{title}</Text>
                    {children}
                    <View className="flex flex-row justify-between gap-x-2 w-full mt-10">
                        <Button
                            onPress={aoFechar}
                            className="flex flex-row gap-x-1 w-1/2"
                            variant={"destructive"}
                        >
                            <XCircle size={15} color={"#FFFFFF"} />
                            <Text>Cancelar</Text>
                        </Button>
                        <Button className="flex flex-row gap-x-1 w-1/2" onPress={aoConfirmar}>
                            <CheckCircle size={15} color={"#FFFFFF"} />
                            <Text>Confirmar</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
