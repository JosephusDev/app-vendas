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
import { PlusCircle } from 'lucide-react-native';

type Column = {
  key: string;
  label: string;
  minWidth?: number;
  renderCell?: (item: any) => React.ReactNode;
};

type MyTableProps = {
  data: any[];
  columns: Column[];
};

export const MyTable: React.FC<MyTableProps> = ({ data, columns }) => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const columnWidths = useMemo(() => {
    const minWidths = columns.map((col) => col.minWidth || 100);
    return minWidths.map((minWidth) => {
      const evenWidth = width / minWidths.length;
      return evenWidth > minWidth ? evenWidth : minWidth;
    });
  }, [width, columns]);

  return (
    <View className='mx-5 mt-10'>
        <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
            <Table aria-labelledby="dynamic-table">
                <TableHeader>
                <TableRow>
                    {columns.map((column, index) => (
                    <TableHead
                        key={column.key}
                        className="px-0.5"
                        style={{ width: columnWidths[index] }}
                    >
                        <Text>{column.label}</Text>
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
                        className={cn('active:bg-secondary', index % 2 && 'bg-muted/40')}
                    >
                        {columns.map((column, colIndex) => (
                        <TableCell
                            key={column.key}
                            style={{ width: columnWidths[colIndex] }}
                        >
                            {column.renderCell ? column.renderCell(item) : <Text>{item[column.key]}</Text>}
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

