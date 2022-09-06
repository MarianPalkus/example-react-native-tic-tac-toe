import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
    maxWidth: '100%',
  },
  aspectRationOne: {
    aspectRatio: 1,
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },

  flex: {
    flex: 1,
  },
  centerChildren: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
