export const getRfcCurp = (payload) => ({
  type: 'GET_RFC_CURP',
  payload,
});

export const setFieldValue = (payload) => ({
  type: 'SET_FIELD_VALUE',
  payload,
});
