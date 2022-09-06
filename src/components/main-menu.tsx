import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { commonStyles } from '../styles/common-styles';

export const MainMenu = ({
  onShowRules,
  onStartGame,
}: {
  onShowRules: () => void;
  onStartGame: () => void;
}) => (
  <View style={[commonStyles.screenContainer, styles.container]}>
    <StatusBar style="auto" />
    <View style={[commonStyles.flex, commonStyles.centerChildren]}>
      <Text style={styles.title}>Tic Tac Toe</Text>
    </View>
    <View style={[commonStyles.flex, styles.buttonContainer]}>
      <Button title="See Rules" accessibilityLabel="See the rules" onPress={onShowRules} />
      <Button title="Start Game" accessibilityLabel="Start a new game" onPress={onStartGame} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 44,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginBottom: 50,
  },
});
