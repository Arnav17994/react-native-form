import React, {Ref} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  View,
} from 'react-native';
import CTextInput from './components/text-input';
import SelectionChips from './components/selection-chips';
import CPicker from './components/picker';
import styles from './styles';

interface Props {
  onSubmit: Function;
  phases: any[];
}

const Form = (props: Props) => {
  const {phases} = props;

  let formState: {[key: string]: any} = React.useRef({});
  const listRef = React.useRef(null);
  let validations = React.useRef(
    phases.map((item) => {
      const validationObj: any = {};
      item.config.forEach((itemInner: any) => {
        validationObj[itemInner.props.stateKey] = false;
      });
      return validationObj;
    }),
  );

  const [page, setPage] = React.useState(0);
  const [showValidations, setShowValidations] = React.useState(false);

  React.useEffect(() => {
    setShowValidations(false);
  }, [page]);

  const updateValidationState = (
    phaseIndex: number,
    stateKey: string,
    toValue: boolean,
  ) => {
    validations.current[phaseIndex][stateKey] = toValue;
  };

  const viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const onViewableItemsChanged = React.useRef((params: any) => {
    setPage(params.viewableItems[0].index);
  });

  const updateParent = (key: string, value: string) => {
    formState.current[key] = value;
  };

  const onPress = () => {
    props.onSubmit(formState.current);
  };

  const getItemLayout = React.useRef((data: any, index: number) => ({
    length: Dimensions.get('window').width,
    offset: Dimensions.get('window').width * index,
    index,
  }));

  const renderItem = ({item, index: indexItem}: any) => {
    const {config} = item;
    return (
      <ScrollView
        key={`phase-item-${indexItem}`}
        style={{width: Dimensions.get('window').width}}>
        {config.map((item: any, index: number) => {
          switch (item.type) {
            case 'textinput':
              return (
                <CTextInput
                  key={`form-element-${index}`}
                  {...item.props}
                  updateParent={updateParent}
                  phase={indexItem}
                  updateValidationState={updateValidationState}
                  showValidations={showValidations}
                />
              );
            case 'selectorchips':
              return (
                <SelectionChips
                  key={`form-element-${index}`}
                  {...item.props}
                  updateParent={updateParent}
                  phase={indexItem}
                  updateValidationState={updateValidationState}
                  showValidations={showValidations}
                />
              );
            case 'picker':
              return (
                <CPicker
                  key={`form-element-${index}`}
                  {...item.props}
                  updateParent={updateParent}
                  phase={indexItem}
                  updateValidationState={updateValidationState}
                  showValidations={showValidations}
                />
              );
            default:
              return null;
          }
        })}
      </ScrollView>
    );
  };

  const isDisabled = () => {
    setShowValidations(true);
    if (!(validations && validations.current[page])) return true;
    return !Object.values(validations.current[page]).reduce(
      (accumulator: boolean, currentValue: boolean) =>
        accumulator && currentValue,
    );
  };

  const moveToPrevious = () => {
    if (isDisabled()) {
      return;
    }
    listRef &&
      listRef.current &&
      listRef.current.scrollToIndex({animated: true, index: page - 1});
  };

  const moveToNext = () => {
    console.log(listRef, isDisabled(), validations);
    if (isDisabled()) {
      return;
    }
    listRef &&
      listRef.current &&
      listRef.current.scrollToIndex({animated: true, index: page + 1});
  };

  const moveToPhase = (index: number) => {
    if (isDisabled()) {
      return;
    }
    listRef &&
      listRef.current &&
      listRef.current.scrollToIndex({animated: true, index});
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          borderBottomColor: '#afafaf',
          borderBottomWidth: 5,
        }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.progressContainer}>
          {new Array(phases.length).fill(1).map((item, index) => (
            <View
              key={`progress-marker-${index}`}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: index === 0 ? 50 : 0,
                marginRight: index === phases.length - 1 ? 50 : 0,
              }}>
              <TouchableOpacity
                onPress={() => moveToPhase(index)}
                style={[
                  styles.progressBar,
                  {backgroundColor: index <= page ? '#00f' : '#a9a9a9'},
                ]}>
                <Text style={styles.progress}>{index}</Text>
              </TouchableOpacity>
              {index < phases.length - 1 ? (
                <View
                  style={{
                    height: 1,
                    backgroundColor: index < page ? '#00f' : '#a9a9a9',
                    width: 50,
                  }}
                />
              ) : null}
            </View>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={phases}
        horizontal={true}
        renderItem={renderItem}
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `item-${item.config.type}-${index}`}
        viewabilityConfig={viewabilityConfig.current}
        getItemLayout={getItemLayout.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
        ref={listRef}
      />
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          disabled={page === 0}
          style={[styles.cta, page === 0 ? {backgroundColor: '#666666'} : {}]}
          onPress={moveToPrevious}>
          <Text style={styles.title}>{'Prev'}</Text>
        </TouchableOpacity>
        {page === phases.length - 1 ? (
          <TouchableOpacity style={styles.cta} onPress={onPress}>
            <Text style={styles.title}>{'Submit'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={page === phases.length - 1}
            style={styles.cta}
            onPress={moveToNext}>
            <Text style={styles.title}>{'Next'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Form;
