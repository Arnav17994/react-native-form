import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {padding: 8},
  title: {fontWeight: 'bold', fontSize: 16, margin: 8},
  description: {opacity: 0.7},
  rowContainer: {flex: 1, flexDirection: 'row'},
  cta: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
    margin: 8,
    height: 40,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldValidation: {margin: 8, fontSize: 10},
});
