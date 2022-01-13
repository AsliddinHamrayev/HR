export default {
  users(state) {
    return state.users;
  },

  hasUser(state) {
    return state.users && state.users.length > 0;
  },
};
