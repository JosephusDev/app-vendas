import React from 'react';
import { Badge } from '~/components/ui/badge';
import { Text } from '~/components/ui/text';
import Feather from "@expo/vector-icons/Feather";

interface IMyBadgeProps{
  text: string
  type?: 'default' | 'secondary' | 'destructive' | 'outline'
  icon?: keyof typeof Feather.glyphMap
  onPressBadge?: () => void
}

export default function MyBadge({text, type = 'default', icon, onPressBadge}: IMyBadgeProps) {
  return (
    <Badge onPress={onPressBadge} variant={type} className='flex justify-center flex-row gap-x-1 w-40 h-10'>
        <Text className='text-base font-regular'><Feather color={"#FFFFFF"} size={15} name={icon}/> {text}</Text>
    </Badge>
  );
}