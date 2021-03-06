const reducer = (state, action) => {
  switch (action.type) {

    case 'SET_RFC_CURP':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        dataUser: { ...state.dataUser, ...action.payload },
      };

    default:
      return state;
  }
};

export default reducer;
