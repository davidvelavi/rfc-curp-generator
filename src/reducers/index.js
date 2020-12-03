const reducer = (state, action) => {
  switch (action.type) {

    case 'GET_RFC_CURP':
      return {
        ...state,
        curp,
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
