import { Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-frame';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>react-native-frame</Text>

      <Button label="Primary" onPress={() => console.log('primary pressed')} />
      <Button label="Secondary" variant="secondary" onPress={() => {}} />
      <Button label="Outline" variant="outline" onPress={() => {}} />
      <Button label="Disabled" disabled onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
});
