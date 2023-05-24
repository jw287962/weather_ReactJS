function reducer(state, action) {
  // ...
  // const initialState = {
  // locations: [],
  // activeLocation: "",
  // toggleTime: 1,
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

  if (action.type === "loading") {
    // handle duplicates!!!
    return {
      ...state,
      loading: action.loading,
    };
  }
}

export { reducer };
