import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 16,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  image: {height: 18, width: 18},
  title: {marginLeft: 16, fontWeight: 'bold'},
  error: {color: '#770000', marginHorizontal: 16, fontSize: 10},
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
