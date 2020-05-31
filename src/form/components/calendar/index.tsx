import React from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

interface Props {
  title: string;
  type: string;
  updateParent: Function;
  stateKey: string;
  updateValidationState: Function;
  phase: number;
  mandatory?: boolean;
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
  } = props;

  const [selectedDate, setSelectedDate] = React.useState(new Date());
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
      if (type === 'datetime') {
        setTimeout(() => setClockVisible(true), 200);
      }
    }
    setCalendarVisible(false);
  };

  const onTimeSelect = (event, date) => {
    if (event.nativeEvent.timestamp) {
      updateParent(
        stateKey,
        selectedDate
          .toISOString()
          .replace(
            /\d\d:\d\d:\d\d/,
            new Date(event.nativeEvent.timestamp).toLocaleTimeString(),
          ),
      );
      updateValidationState(phase, stateKey, true);
    }
    setClockVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handleOpenPress}>
        <Text>{title}</Text>
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
