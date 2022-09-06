import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { commonStyles } from '../styles/common-styles';

export const Rules = ({ goBack }: { goBack: () => void }) => (
  <View style={commonStyles.screenContainer}>
    <Button title="Back" onPress={goBack} />
    <ScrollView>
      <Text style={styles.text}>
        Tic-tac-toe is played on a three-by-three grid by two players, who alternately place the
        marks X and O in one of the nine spaces in the grid.
      </Text>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});
