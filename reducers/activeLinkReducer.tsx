interface State {
  activeNavbarId: string | null;
}

interface Action {
  type: string;
  payload?: any;
}


const initialState: State = {
  activeNavbarId: "",
};

const activeReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case "SET_ACTIVE_NAVBAR":
      return {
        ...state,
        activeNavbarId: action.payload,
      };
    default:
      return state;
  }
};

export default activeReducer;
