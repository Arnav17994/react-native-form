import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {paddingHorizontal: 16, paddingVertical: 8},
  title: {fontWeight: 'bold', fontSize: 16},
  description: {opacity: 0.7, marginVertical: 8},
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    height: 40,
  },
  textContainer: {
    position: 'absolute',
    left: 16,
    backgroundColor: '#d0d0d0',
    paddingHorizontal: 2,
  },
  error: {
    textAlign: 'right',
    fontSize: 10,
    color: '#770000',
    marginHorizontal: 8,
  },
});
