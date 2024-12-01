import { Plus } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

interface AddButtonProps {
  aoClicar?: () => void;
}

export function AddButton(
  {aoClicar}: AddButtonProps
) {

  return (
    <View className="flex-1">
      <Pressable
        onPress={aoClicar}
        className="absolute bottom-20 right-5 bg-primary w-14 h-14 rounded-full shadow-lg 
                   flex items-center justify-center active:opacity-80"
      >
        <Plus size={24} color={"#FFF"} />
      </Pressable>
    </View>
  );
}
