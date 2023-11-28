export default function resturentReducer(state = {}, action) {
  switch (action.type) {
    case "resturent_inform":
      return {
        ...state,
        action,
        resturentData: action.data,
      };

    default:
      return state;
  }
}
