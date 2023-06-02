function reducer(state, action) {
  if (action.type === "timer") {
    return {
      ...state,
      timer: (state.timer | 0) + 1,
    };
  }

  if (action.type === "add_location") {
    if (
      state.locationsData[action.activeLocation] ||
      state.locations.includes(action.activeLocation)
    ) {
      console.log("refreshed");
      return {
        ...state,
        activeLocation: action.activeLocation,
        locationsData: { ...state.locationsData, ...action.locationsData },
        timer: 0,
      };
    } else {
      console.log("add_location", action.activeLocation);
      return {
        ...state,
        locations: [action.activeLocation, ...state.locations],
        activeLocation: action.activeLocation,
        locationsData: { ...state.locationsData, ...action.locationsData },
        timer: 0,
      };
    }
  }
  if (action.type === "removeLocation") {
    console.log(state);
    return {
      ...state,
      locations: [...state.locations],
      locationsData: { ...action.locationsData },
    };
  }

  if (action.type === "error") {
    return {
      ...state,
      error: action.error,
      loading: "",
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
