function reducer(state, action) {
  // ...
  // const initialState = {
  // locations: [],
  // activeLocation: "",
  // toggleTime: 1,
  // expandLocation: "",
  // loading: true,
  // };
  if (action.type === "add_location") {
    if (state.locationsData[action.activeLocation]) {
      return {
        ...state,
        locations: [...state.locations],
        activeLocation: action.activeLocation,
        locationsData: { ...action.locationsData },
      };
    }
    return {
      ...state,
      locations: [action.activeLocation, ...state.locations],
      activeLocation: action.activeLocation,
      locationsData: { ...action.locationsData },
    };
  }

  if (action.type === "refresh") {
    // handle duplicates!!!
    return {
      ...state,
      locationsData: { ...action.locationsData },
    };
  }

  if (action.type === "loading") {
    return {
      ...state,
      loading: action.loading,
    };
  }

  if (action.type === "selection") {
    return {
      ...state,
      expandLocation: action.expandLocation,
    };
  }
  if (action.type === "home") {
    return {
      ...state,
      expandLocation: "",
    };
  }
}

export { reducer };
