import { Button, Text, View } from 'react-native';
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
  <View style={commonStyles.screenContainer}>
    <Text>Tic Tac Toe</Text>
    <StatusBar style="auto" />
    <View>
      <Button title="See Rules" accessibilityLabel="See the rules" onPress={onShowRules} />
      <Button title="Start Game" accessibilityLabel="Start a new game" onPress={onStartGame} />
    </View>
  </View>
);
