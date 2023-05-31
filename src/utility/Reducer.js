function reducer(state, action) {
  if (action.type === "timer") {
    return {
      ...state,
      timer: (state.timer | 0) + 1,
    };
  }

  if (action.type === "add_location") {
    console.log(state, action);
    if (
      state.locationsData[action.activeLocation] ||
      state.locations.includes(action.activeLocation)
    ) {
      console.log("refreshed");
      return {
        ...state,
        activeLocation: action.activeLocation,
        locationsData: { ...action[`locationsData`], ...state.locationsData },
        timer: 0,
      };
    } else {
      console.log("add location", action.activeLocation);
      return {
        ...state,
        locations: [action.activeLocation, ...state.locations],
        activeLocation: action.activeLocation,
        locationsData: { ...action[`locationsData`] },
        timer: 0,
      };
    }
  }
  if (action.type === "removeLocation") {
    return {
      ...state,
      locations: [action.activeLocation],
    };
  }

  // if (action.type === "addFromCookieLocation") {
  //   console.log(state);

  //   return {
  //     ...state,
  //     locations: [...action.locations],
  //     activeLocation: action.activeLocation,
  //     locationsData: { ...action.locationsData },
  //     timer: 0,
  //   };
  // }

  if (action.type === "error") {
    return {
      ...state,
      error: action.error,
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
