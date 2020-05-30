import React from 'react';

import {View, TextInput, Text, TextInputProps, Animated} from 'react-native';
import styles from './styles';

interface Props extends TextInputProps {
  title: string;
  description?: string;
  stateKey: string;
  updateParent: Function;
  initialValue?: string;
  validation?: Function;
  mandatory?: boolean;
  updateValidationState: Function;
  phase: number;
  showValidations: boolean;
}

const CTextInput = (props: Props) => {
  const {
    title,
    description,
    stateKey,
    updateParent,
    initialValue,
    validation,
    mandatory,
    updateValidationState,
    phase,
    showValidations,
    ...rest
  } = props;

  const [value, setValue] = React.useState('');
  const [showPlaceholder, toggleShowPlaceholder] = React.useState(true);
  const [placeholderPosition] = React.useState(new Animated.Value(8));
  const [fontSize] = React.useState(new Animated.Value(1.2));
  const [opacity] = React.useState(new Animated.Value(0.5));
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
      toggleShowPlaceholder(false);
    }
  }, []);

  React.useEffect(() => {
    updateParent(stateKey, value);
    if (!mandatory && !value) {
      updateValidationState(phase, stateKey, true);
    } else {
      const validationStatus = validation ? validation(value) : true;
      updateValidationState(phase, stateKey, validationStatus);
    }
  }, [value]);

  React.useEffect(() => {
    if (!showPlaceholder) {
      Animated.parallel([
        Animated.timing(placeholderPosition, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fontSize, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
    if (showPlaceholder) {
      Animated.parallel([
        Animated.timing(placeholderPosition, {
          toValue: 8,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fontSize, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showPlaceholder]);

  const onFocus = () => {
    setTouched(true);
    toggleShowPlaceholder(false);
  };

  const onBlur = () => {
    if (!value) {
      toggleShowPlaceholder(true);
    }
  };

  const getFieldColor = () => {
    if (showValidations && validation && !validation(value)) return '#770000';
    if (!touched && validation && !validation(value)) return '#000';
    if (!value && !!mandatory) return '#770000';
    if (!value && !mandatory) return '#000';
    if (value && validation && !validation(value)) return '#770000';
    if (value && validation && validation(value)) return '#00f';
  };

  const getFieldValidationString = () => {
    if (showValidations) {
      if (validation && value && !validation(value)) return 'Invalid Input';
      if (!value && mandatory) return 'Required Field';
    }
    if (touched && value && validation && validation(value)) return '';
    if (touched && value && validation && !validation(value))
      return 'Invalid Input';
    if (mandatory && touched && !value) return 'Required Field';
    if (!touched || !mandatory) return '';
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {marginBottom: !description ? 8 : 0}]}>
        {title}
      </Text>
      {description ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      <View>
        <TextInput
          style={[styles.textInput, {borderColor: getFieldColor()}]}
          value={value}
          onChangeText={setValue}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
          placeholder={''}
        />
        <Text style={styles.error}>{getFieldValidationString()}</Text>
        <Animated.View
          pointerEvents={'none'}
          style={[styles.textContainer, {translateY: placeholderPosition}]}>
          <Animated.Text
            style={{
              transform: [
                {
                  scale: fontSize,
                },
              ],
              opacity: opacity,
              color: getFieldColor(),
            }}>
            {props.placeholder}
          </Animated.Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default CTextInput;
