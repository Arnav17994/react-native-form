import React from 'react';
import {View, Alert} from 'react-native';
import Form from './src/form';
import {
  nameValidation,
  ageValidation,
  selectionChipsValidation,
} from './src/validations';

const phase1 = [
  {
    type: 'textinput',
    props: {
      title: 'Enter Name',
      description: 'Enter your full name here',
      placeholder: 'Enter Name',
      stateKey: 'name',
      mandatory: true,
      // initialValue: 'Arnav Sharma',
      validation: nameValidation,
    },
  },
  {
    type: 'textinput',
    props: {
      title: 'Enter Age',
      description: 'Enter your Age here',
      placeholder: 'Enter Age',
      stateKey: 'age',
      keyboardType: 'number-pad',
      mandatory: true,
      // initialValue: '25',
      validation: ageValidation,
    },
  },
  {
    type: 'selectorchips',
    props: {
      options: [
        [
          {title: 'Developer', value: 'developer'},
          {title: 'Manager', value: 'manager'},
        ],
        [
          {title: 'CTO', value: 'cto'},
          {title: 'Builder', value: 'builder'},
        ],
        [
          {title: 'Teacher', value: 'teacher'},
          {title: 'Driver', value: 'driver'},
        ],
      ],
      stateKey: 'profession',
      title: 'Select your profession',
      multiple: true,
      mandatory: true,
      vertical: true,
      initialValue: 'driver',
      validation: selectionChipsValidation,
    },
  },
  {
    type: 'picker',
    props: {
      options: [
        {title: '25 - 30', value: [25, 30]},
        {title: '30 - 35', value: [30, 35]},
        {title: '35 - 40', value: [35, 40]},
        {title: '40 - 45', value: [40, 45]},
        {title: '45 - 50', value: [45, 50]},
        {title: '50 - 55', value: [50, 55]},
      ],
      title: 'Age Range',
      stateKey: 'ageRange',
      description: 'Please select your age range',
      multiple: true,
      initialValue: [50, 55],
    },
  },
  {
    type: 'datetimepicker',
    props: {
      title: 'Appointment Date',
      stateKey: 'apptDate',
      type: 'datetime',
      mandatory: true,
    },
  },
];

const phase2 = [
  {
    type: 'picker',
    props: {
      options: [
        {title: 'Rs. 10,000 - Rs. 25,000', value: [10000, 25000]},
        {title: 'Rs. 25,001 - Rs. 50,000', value: [25001, 50000]},
        {title: 'Rs. 50,001 - Rs. 75,000', value: [50001, 75000]},
        {title: 'Rs. 75,001 - Rs. 1,00,000', value: [75000, 100000]},
        {title: 'Rs. 1,00,000 +', value: [100001]},
      ],
      title: 'Salary Range',
      stateKey: 'salaryRange',
      description: 'Please select your salary range',
      multiple: true,
      initialValue: [50001, 75000],
    },
  },
  {
    type: 'textinput',
    props: {
      title: 'Enter City',
      description: 'Enter your city here',
      placeholder: 'Enter City',
      stateKey: 'city',
      mandatory: true,
      initialValue: 'New Delhi',
    },
  },
  {
    type: 'textinput',
    props: {
      title: 'Enter State',
      description: 'Enter your state here',
      placeholder: 'Enter State',
      stateKey: 'state',
      keyboardType: 'number-pad',
      mandatory: true,
      initialValue: 'Delhi',
    },
  },
  {
    type: 'selectorchips',
    props: {
      options: [
        [
          {title: 'Green', value: 'green'},
          {title: 'Red', value: 'red'},
        ],
        [
          {title: 'Yellow', value: 'yellow'},
          {title: 'Orange', value: 'orange'},
        ],
        [
          {title: 'Peach', value: 'peach'},
          {title: 'Purple', value: 'purple'},
        ],
      ],
      stateKey: 'color',
      title: 'Select your color',
      multiple: true,
      mandatory: true,
      initialValue: 'purple',
    },
  },
];

const App = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#d0d0d0'}}>
      <Form
        phases={[{config: phase1}, {config: phase2}]}
        onSubmit={(state: any) => console.log('formstate', state)}
      />
    </View>
  );
};

export default App;
