import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

interface Props {
  options: {title: string; value: any}[][];
  title: string;
  description?: string;
  updateParent: Function;
  stateKey: string;
  multiple?: boolean;
  vertical?: boolean;
  initialValue?: any;
  updateValidationState: Function;
  validation?: Function;
  phase: number;
  showValidations: Function;
  mandatory?: boolean;
}

const SelectionChips = (props: Props) => {
  const {
    options,
    title,
    description,
    updateParent,
    stateKey,
    multiple,
    vertical,
    initialValue,
    updateValidationState,
    validation,
    phase,
    showValidations,
    mandatory,
  } = props;

  const [value, setValue] = React.useState([] as any[]);
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (initialValue) {
      setValue([initialValue]);
    }
  }, []);

  React.useEffect(() => {
    updateParent(stateKey, value);
    if (!mandatory) {
      if (!value.length) {
        updateValidationState(phase, stateKey, true);
      }
    } else {
      const validationStatus = validation ? validation(value) : true;
      updateValidationState(phase, stateKey, validationStatus);
    }
  }, [value]);

  const setSelectedValues = (selected: string) => {
    if (multiple) {
      if (value.indexOf(selected) !== -1) {
        setValue([...value.filter((item) => item != selected)]);
      } else {
        setValue([...value, selected]);
      }
    } else {
      setValue([selected]);
    }
  };

  const getFieldColor = (val?: string) => {
    if (showValidations && validation && value && !validation(value))
      return '#770000';
    if (
      (!touched && validation && !validation(value)) ||
      (val && value.indexOf(val) === -1)
    )
      return '#000';
    if (!value.length) {
      if (mandatory) return '#770000';
      return '#000';
    }
    if (value && validation && !validation(value)) return '#770000';
    if (
      (value && validation && validation(value)) ||
      (val && value.indexOf(val) !== -1)
    )
      return '#00f';
  };

  const getFieldValidationString = () => {
    if (showValidations) {
      if (validation && value.length && !validation(value))
        return 'Invalid Input';
      if (!value.length && mandatory) return 'Required Field';
    }
    if (touched && value.length && validation) {
      if (validation(value)) return '';
      return 'Invalid Input';
    }
    if (mandatory && touched && !value.length) return 'Required Field';
    if (!touched || !mandatory) return '';
  };

  const onPress = (val: any) => {
    if (!touched) {
      setTouched(true);
    }
    setSelectedValues(val);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.fieldValidation, {color: getFieldColor()}]}>
          {getFieldValidationString()}
        </Text>
      </View>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {options.map((itemOuter, indexOuter) => (
        <View
          key={`item-outer-${indexOuter}`}
          style={[
            styles.rowContainer,
            {flexDirection: vertical ? 'column' : 'row'},
          ]}>
          {itemOuter.map((itemInner, indexInner) => (
            <TouchableOpacity
              key={`item-inner-${indexInner}`}
              style={[
                styles.cta,
                {
                  borderColor:
                    value.indexOf(itemInner.value) !== -1 ? '#00f' : '#000',
                },
              ]}
              onPress={() => onPress(itemInner.value)}>
              <Text
                style={{
                  color:
                    value.indexOf(itemInner.value) !== -1 ? '#00f' : '#000',
                }}>
                {itemInner.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default SelectionChips;
