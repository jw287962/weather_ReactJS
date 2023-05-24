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
    // handle duplicates!!!
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
    // handle duplicates!!!
    return {
      ...state,
      loading: action.loading,
    };
  }

  if (action.type === "selection") {
    // handle duplicates!!!
    return {
      ...state,
      expandLocation: action.expandLocation,
    };
  }
  if (action.type === "home") {
    // handle duplicates!!!
    return {
      ...state,
      expandLocation: "",
    };
  }
}

export { reducer };
