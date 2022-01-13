// import firebase from "firebase/compat/app";
import "firebase/compat/database";
export default {
  addUser(context, data) {
    const userId = Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
    const userData = {
      name: data.name,
      LastName: data.LastName,
      number: data.number,
      email: data.email,
      gender: data.gender,
      department: data.department,
      position: data.position,
      date: data.date,
    };

    const response = fetch(
      `https://vuexfirebase-f8707-default-rtdb.firebaseio.com/users/${userId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(userData),
      }
    );

    // const responseData = await response.json();

    if (!response.ok) {
      //  ..err
    }

    context.commit("addUser", {
      ...userData,
      id: userId,
    });
  },

  async loadUsers(context) {
    const response = await fetch(
      `https://vuexfirebase-f8707-default-rtdb.firebaseio.com/users.json`
    );
    const responseData = await response.json();

    if (!response.ok) {
      //  err
    }

    const users = [];
    for (const key in responseData) {
      const user = {
        id: key,
        name: responseData[key].name,
        LastName: responseData[key].LastName,
        number: responseData[key].number,
        email: responseData[key].email,
        gender: responseData[key].gender,
        department: responseData[key].department,
        position: responseData[key].position,
        date: responseData[key].date,
      };
      users.push(user);
    }

    context.commit("setUsers", users);
    return users;
  },

  EditUser(context, data) {
    const newData = {
      id: data.id,
      name: data.name,
      LastName: data.LastName,
      number: data.number,
      email: data.email,
      gender: data.gender,
      department: data.department,
      position: data.position,
      date: data.date,
    };
    const UserId = data.id;

    const response = fetch(
      `https://vuexfirebase-f8707-default-rtdb.firebaseio.com/users/${UserId}.json`,
      {
        method: "PUT",
        body: JSON.stringify(newData),
      }
    );
    if (!response.ok) {
      //  ..err
    }

    context.commit("EditUser", {
      ...newData,
    });
  },
};
