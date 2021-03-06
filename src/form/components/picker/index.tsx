import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import styles from './styles';

const close = require('../../../assets/cross.png');
const expand = require('../../../assets/arrow-down.png');

interface Props {
  title: string;
  description?: string;
  options: {title: string; value: any}[];
  updateParent: Function;
  multiple: boolean;
  stateKey: string;
  initialValue?: any;
  validation?: Function;
  phase: number;
  updateValidationState: Function;
  showValidations: boolean;
  mandatory?: boolean;
}

const CPicker = (props: Props) => {
  const {
    title,
    options,
    description,
    updateParent,
    multiple,
    stateKey,
    initialValue,
    validation,
    phase,
    updateValidationState,
    showValidations,
    mandatory,
  } = props;

  const [isVisible, toggleVisibility] = React.useState(false);
  const [value, setValue] = React.useState({});
  const [searchValue, setSearchValue] = React.useState('');
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (initialValue) {
      setValue({[JSON.stringify(initialValue)]: true});
    }
  }, []);

  React.useEffect(() => {
    updateParent(
      stateKey,
      Object.keys(value).map((item) => JSON.parse(item).value),
    );
    if (!mandatory) {
      if (!Object.keys(value).length) {
        updateValidationState(phase, stateKey, true);
      }
    } else {
      const validationStatus = validation ? validation(value) : true;
      updateValidationState(phase, stateKey, validationStatus);
    }
  }, [value]);

  const setSelectedValues = (selected: any) => {
    if (multiple) {
      if (JSON.stringify(selected) in value) {
        let copy: any = {...value};
        delete copy[JSON.stringify(selected)];
        setValue(copy);
      } else {
        let copy: any = {...value};
        copy[JSON.stringify(selected)] = true;
        setValue(copy);
      }
    } else {
      setValue({[JSON.stringify(selected)]: true});
    }
  };

  const onClose = () => {
    toggleVisibility(false);
  };

  const onOpen = () => {
    if (!touched) {
      setTouched(true);
    }
    toggleVisibility(true);
  };

  const getFieldColor = () => {
    if (showValidations && validation && !validation(value)) return '#770000';
    if (!touched && validation && !validation(value)) return '#000';
    if (!Object.keys(value).length) {
      if (mandatory) return '#770000';
      return '#000';
    }
    if (validation) {
      if (!validation(value)) return '#770000';
      return '#00f';
    }
  };

  const getFieldValidationString = () => {
    if (showValidations) {
      if (validation && Object.keys(value).length && !validation(value))
        return 'Invalid Input';
      if (!Object.keys(value).length && mandatory) return 'Required Field';
    }
    if (touched && Object.keys(value).length && validation && validation(value))
      return '';
    if (
      touched &&
      Object.keys(value).length &&
      validation &&
      !validation(value)
    )
      return 'Invalid Input';
    if (mandatory && touched && !Object.keys(value).length)
      return 'Required Field';
    if (!touched || !mandatory) return '';
  };

  const renderOptions = () => (
    <ScrollView>
      {options
        .filter((item) => JSON.stringify(item).includes(searchValue))
        .map((item: {title: string; value: any}, index: number) => (
          <TouchableOpacity
            key={`picker-item-${index}`}
            style={[
              styles.pickerItem,
              {
                borderColor: JSON.stringify(item) in value ? '#00f' : '#a9a9a9',
              },
            ]}
            onPress={() => setSelectedValues(item)}>
            <Text
              style={[
                styles.value,
                {
                  color: JSON.stringify(item) in value ? '#00f' : '#a9a9a9',
                },
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );

  const renderSelectedOptions = () => (
    <View style={styles.selectedOptionsContainer}>
      {Object.keys(value).map((item, index) => (
        <View key={`selected-item-${index}`} style={styles.chip}>
          <Text style={styles.chipTitle}>{JSON.parse(item).title}</Text>
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => setSelectedValues(JSON.parse(item))}>
            <Image source={close} style={styles.delete} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <>
      <View style={styles.buttonContainer}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={{color: getFieldColor(), fontSize: 10}}>
          {getFieldValidationString()}
        </Text>
      </View>
      <TouchableOpacity style={styles.ctaContainer} onPress={onOpen}>
        <Text>{title}</Text>
        <Image source={expand} style={styles.close} resizeMode="contain" />
      </TouchableOpacity>
      {renderSelectedOptions()}
      <Modal
        hardwareAccelerated
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity activeOpacity={0.5} onPress={onClose}>
                <Image
                  source={close}
                  style={styles.close}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            {description ? (
              <Text style={styles.description}>{description}</Text>
            ) : null}
            <TextInput
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder={'Search...'}
            />
            {renderOptions()}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CPicker;
