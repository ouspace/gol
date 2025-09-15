import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function Application() {
	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<ScrollView>
					<View>
						<Text>Hi...</Text>
					</View>
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
