import { SafeAreaView, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from './src/state/redux-store';
import { AppRootNavigation } from './src/screens/app-root-navigation';

const store = createStore();
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <AppRootNavigation />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
