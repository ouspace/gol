import { ScrollView, View, Text } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { Icon } from '../components/icon/index';

export default function Application() {
	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<ScrollView>
					<View>
						<Text>Hi...</Text>
						<Icon name='10k' size='small' />
						<Icon name='10k' size='smallless' color='green' />
						<Icon name='10k' />
						<Icon name='10k' size="bigless" color='orange' />
						<Icon name='10k' size="big" color='red' />
						<Icon name='10k' size={48} color='blue' />
					</View>
				</ScrollView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
