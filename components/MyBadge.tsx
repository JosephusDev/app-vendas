import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Badge } from '~/components/ui/badge';
import { Text } from '~/components/ui/text';

interface IMyBadgeProps{
  text: string;
  type?: 'default' | 'secondary' | 'destructive' | 'outline'
  icon?: React.ReactNode
  onPressBadge?: () => void;
}

export default function MyBadge({text, type = 'default', icon, onPressBadge}: IMyBadgeProps) {
  return (
    <TouchableOpacity onPress={onPressBadge}>
      <Badge variant={type} className='w-40 h-10 flex justify-center flex-row gap-x-1'>
          {icon}<Text className='text-base font-regular'>{text}</Text>
      </Badge>
    </TouchableOpacity>
  );
}