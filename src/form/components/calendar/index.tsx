import React from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity, Text, Image} from 'react-native';
import styles from './styles';

const expand = require('../../../assets/arrow-down.png');

interface Props {
  title: string;
  type: string;
  updateParent: Function;
  stateKey: string;
  updateValidationState: Function;
  phase: number;
  mandatory?: boolean;
  showValidations: boolean;
}

const Calendar = (props: Props) => {
  const {
    title,
    type,
    updateParent,
    stateKey,
    updateValidationState,
    phase,
    mandatory,
    showValidations,
  } = props;

  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState(new Date());

  const [isCalendarVisible, setCalendarVisible] = React.useState(false);

  const [isClockVisible, setClockVisible] = React.useState(false);

  React.useEffect(() => {
    if (!mandatory) {
      updateValidationState(phase, stateKey, true);
    }
  }, []);

  const handleOpenPress = () => {
    if (type === 'time') {
      setClockVisible(true);
    } else {
      setCalendarVisible(true);
    }
  };

  const onDateSelect = (event, date) => {
    if (event.nativeEvent.timestamp) {
      setSelectedDate(new Date(event.nativeEvent.timestamp));
      if (type === 'date') {
        updateParent(
          stateKey,
          new Date(event.nativeEvent.timestamp).toISOString(),
        );
        updateValidationState(phase, stateKey, true);
      }
    }
    setCalendarVisible(false);
    if (event.nativeEvent.timestamp && type === 'datetime') {
      setTimeout(() => setClockVisible(true), 200);
    }
  };

  const onTimeSelect = (event, date) => {
    if (event.nativeEvent.timestamp) {
      const val = selectedDate
        .toISOString()
        .replace(
          /\d\d:\d\d:\d\d/,
          new Date(event.nativeEvent.timestamp).toLocaleTimeString(),
        );
      setSelectedTime(new Date(event.nativeEvent.timestamp));
      updateParent(stateKey, val);
      updateValidationState(phase, stateKey, true);
    }
    setClockVisible(false);
  };

  const getCTATitle = () => {
    if (type === 'datetime') {
      return `${selectedDate.toLocaleDateString()}, ${selectedTime.toLocaleTimeString()}`;
    }
    if (type === 'date') {
      return selectedDate.toLocaleDateString();
    }
    if (type === 'time') {
      return selectedTime.toLocaleTimeString();
    }
  };

  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.container} onPress={handleOpenPress}>
        <Text>{getCTATitle()}</Text>
        <Image source={expand} style={styles.image} resizeMode="contain" />
      </TouchableOpacity>
      {isCalendarVisible ? (
        <RNDateTimePicker
          value={selectedDate}
          mode={'date'}
          onChange={onDateSelect}
        />
      ) : null}
      {isClockVisible ? (
        <RNDateTimePicker
          value={new Date()}
          mode={'time'}
          is24Hour={true}
          onChange={onTimeSelect}
        />
      ) : null}
    </>
  );
};

export default Calendar;
