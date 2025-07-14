import { Stack } from 'expo-router'

export default function VendasLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='index'
		>
			<Stack.Screen name='index' />
			<Stack.Screen name='item' />
		</Stack>
	)
}
