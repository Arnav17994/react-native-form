import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  ctaContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    margin: 16,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: 0.7 * Dimensions.get('window').height,
    backgroundColor: '#fff',
    padding: 16,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    paddingBottom: 0,
  },
  title: {marginBottom: 16, fontWeight: 'bold'},
  description: {opacity: 0.7, marginBottom: 16},
  pickerItem: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  value: {fontWeight: 'bold'},
  modalTitle: {marginLeft: 16, fontWeight: 'bold'},
  close: {height: 18, width: 18},
  titleContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
