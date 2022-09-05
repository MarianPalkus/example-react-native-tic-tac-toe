import React from 'react';
import { View, Text, Button } from 'react-native';
import { commonStyles } from '../styles/common-styles';

export const Rules = ({ goBack }: { goBack: () => void }) => (
  <View style={commonStyles.screenContainer}>
    <Button title="Back" onPress={goBack} />
    <Text>
      Tic-tac-toe is played on a three-by-three grid by two players, who alternately place the marks
      X and O in one of the nine spaces in the grid. In the following example, the first player (X)
      wins the game in seven steps: (source https://en.wikipedia.org/wiki/Tic-tac-toe)
    </Text>
  </View>
);
