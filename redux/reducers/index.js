export const UserReducer = (
  state = {
    loggedIn: false,
  },
  action
) => {
  switch (action.type) {
    case "LOGIN":
      return {
        loggedIn: true,
        username: action.payload.username,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        loggedIn: false,
      };
    default:
      return state;
  }
};
