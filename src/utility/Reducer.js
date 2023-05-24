function reducer(state, action) {
  const locations = [];

  // ...
  // const initialState = {
  // locations: [],
  // activeLocation: "",
  // toggleTime: 1,
  // loading: true,
  // };
  if (action.type === "add_location") {
    console.log("dispatch add location state", state, action);
    // handle duplicates!!!
    return {
      ...state,
      locations: [...locations, action.activeLocation],
      activeLocation: action.activeLocation,
      locationsData: action.locationsData,
    };
  }

  if (action.type === "loading") {
    // handle duplicates!!!
    return {
      ...state,
      loading: action.loading,
    };
  }
}

export { reducer };
