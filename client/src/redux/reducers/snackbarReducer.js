const snackbarState = {
  snackbar: {
    isOpen: false,
    type: 'info',
    message: '',
    time: 3000,
  },
};

const snackbarReducer = function (state = snackbarState, action) {
  switch (action.type) {
    case 'SNACKBARUPDATE':
      return {
        ...state,
        snackbar: action.snackbar,
      };

    case 'SNACKBARCLOSE':
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          isOpen: false,
        },
      };

    default: return state;
  }
};

export default snackbarReducer;
