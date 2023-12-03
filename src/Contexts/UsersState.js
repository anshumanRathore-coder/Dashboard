import { useState } from "react";
import { UsersContext } from "./UsersContext";

const UsersState = (props) => {
  const [users, setUsers] = useState([]);
  const [checkboxId, setCheckbox] = useState([]);

  return (
    <UsersContext.Provider value={{ users, setUsers, checkboxId, setCheckbox }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
