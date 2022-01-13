export default {
  addUser(state, payload) {
    state.users.push(payload);
  },

  setUsers(state, payload) {
    state.users = payload;
  },

  EditUser(state, payload) {
    state.users.push(payload);
  },
};
