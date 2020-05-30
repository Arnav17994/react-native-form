const nameValidation = (name: string) => {
  return name && name.length > 1 && typeof name === 'string' ? true : false;
};

const ageValidation = (age: string) => {
  return age && parseInt(age) > 18 ? true : false;
};

const selectionChipsValidation = (value: []) => {
  return value.length > 0;
};

const multiSelectorValidation = (value: any) => {
  return Object.keys(value).length > 0;
};

export {
  nameValidation,
  ageValidation,
  selectionChipsValidation,
  multiSelectorValidation,
};
