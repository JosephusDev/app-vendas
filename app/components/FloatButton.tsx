import React from 'react';
import { Pressable, View } from 'react-native';

interface FloatButtonProps {
  aoClicar?: () => void;
  icon: React.ReactNode;
}

export function FloatButton(
  {aoClicar, icon}: FloatButtonProps
) {

  return (
    <View className="flex-1">
      <Pressable
        onPress={aoClicar}
        className="absolute bottom-28 right-8 bg-primary w-14 h-14 rounded-full shadow-lg 
                   flex items-center justify-center active:opacity-80"
      >
        {icon}
      </Pressable>
    </View>
  );
}
