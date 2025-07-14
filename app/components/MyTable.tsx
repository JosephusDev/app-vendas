import React, { useMemo } from 'react';
import {
  FlatList,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Text } from './ui/text';
import { cn } from '~/lib/utils';
import { Button } from './ui/button';
import { Clipboard, PlusCircle } from 'lucide-react-native';
import { useColorScheme } from '~/lib/useColorScheme';

type Column = {
  key: string;
  label: string;
  minWidth?: number;
  renderCell?: (item: any, index: number) => React.ReactNode;
};

type MyTableProps = {
  data: any[];
  columns: Column[];
};

export const MyTable: React.FC<MyTableProps> = ({ data, columns }) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {isDarkColorScheme} = useColorScheme()

  const columnWidths = useMemo(() => {
    const minWidths = columns.map((col) => col.minWidth || 100);
    return minWidths.map((minWidth) => {
      return minWidth;
    });
  }, [width, columns]);

  return (
    <View className='mx-5 mt-10'>
        <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
            <Table aria-labelledby="dynamic-table">
                <TableHeader>
                <TableRow>
                    <TableHead style={{ width: 50 }}>
                        <Text className='font-regular'>#</Text>
                    </TableHead>
                    {columns.map((column, index) => (
                    <TableHead
                        key={column.key}
                        style={{ width: columnWidths[index] }}
                    >
                        <Text className='font-regular'>{column.label}</Text>
                    </TableHead>
                    ))}
                </TableRow>
                </TableHeader>
                <TableBody>
                <FlatList
                    data={data}
                    contentContainerStyle={{
                    paddingBottom: insets.bottom,
                    }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                    <TableRow
                        key={index}
                        className='pr-10'
                    >
                        <TableCell style={{ width: 50 }}>
                            <Text>{index + 1}</Text>
                        </TableCell>
                        {columns.map((column, colIndex) => (
                        <TableCell
                            key={column.key}
                            style={{ width: columnWidths[colIndex] }}
                        >
                            {column.renderCell ? column.renderCell(item, index) : <Text>{item[column.key]}</Text>}
                        </TableCell>
                        ))}
                    </TableRow>
                    )}
                />
                </TableBody>
            </Table>
        </ScrollView>
    </View>
  );
};
