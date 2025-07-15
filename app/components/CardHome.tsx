import Feather from "@expo/vector-icons/Feather";
import { View } from "react-native";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Text } from "./ui/text";
import { useColorScheme } from "~/lib/useColorScheme";

interface CardHomeProps {
    title: string;
    description: string;
    icon: keyof typeof Feather.glyphMap;
    content: string;
}

export default function CardHome(
    {title, description, icon, content}: CardHomeProps
){
    const { isDarkColorScheme } = useColorScheme();
    return (
        <Card className="w-full bg-secondary mt-5">
            <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                    <View className="flex flex-row items-center">
                        <Feather name={icon} size={20} color={isDarkColorScheme ? "#FFFFFF" : "#000000"}/> 
                        <Text className="font-medium text-xl ml-2">{title}</Text>
                    </View>
                </CardTitle>
                <CardDescription className="mt-1 font-medium">{description}</CardDescription>
            </CardHeader>
            <CardContent><Text className="text-xl font-medium">{content}</Text></CardContent>
        </Card>
    )
}