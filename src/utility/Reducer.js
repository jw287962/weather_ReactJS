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
      return {
        ...state,
        activeLocation: action.activeLocation,
        locationsData: { ...state.locationsData, ...action.locationsData },
        timer: 0,
      };
    } else {
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
    if (action.loading === false) {
      return {
        ...state,
        loading: action.loading,
      };
    }
    return {
      ...state,
      loading: action.loading,
      error: "",
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
