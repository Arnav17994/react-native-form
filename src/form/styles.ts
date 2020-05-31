import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  submitButton: {
    backgroundColor: '#00f',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 40,
  },
  submit: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderTopWidth: 5,
    borderTopColor: '#afafaf',
  },
  cta: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 4,
    backgroundColor: '#00f',
    margin: 8,
  },
  title: {color: '#fff'},
  submitContainer: {padding: 16, borderTopWidth: 5, borderTopColor: '#aaa'},
  progressBar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  progress: {fontSize: 16, fontWeight: 'bold', color: '#fff'},
  container: {flex: 1},
  progressBarContainer: {
    alignItems: 'center',
    borderBottomColor: '#afafaf',
    borderBottomWidth: 5,
  },
  disabled: {backgroundColor: '#666666'},
  progressMarker: {flexDirection: 'row', alignItems: 'center'},
  divider: {height: 1, width: 50},
});
