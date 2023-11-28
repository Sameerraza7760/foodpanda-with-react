export function cityResturent(state = {}, action) {
  switch (action.type) {
    case "setCity":
      return { ...state, action, e: action.data };

    default:
      return state;
  }
}
