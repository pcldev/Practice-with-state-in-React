import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";
import styles from "./AddUser.module.css";

function AddUser(props) {
  const [enterUsername, setEnterUsername] = useState("");
  const [enterAge, setEnterAge] = useState("");
  const [error, setError] = useState();
  const usernameChangeHandler = (event) => {
    setEnterUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnterAge(event.target.value);
  };
  const addUserHandler = (event) => {
    event.preventDefault();
    if (enterUsername.trim().length === 0 || enterAge.trim.apply.length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid nam and age (non-empty values).",
      });
      return;
    }

    if (+enterAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a vlid age (>0)",
      });
      return;
    }
    props.onAddUser({
      id: Math.random().toString(),
      name: enterUsername,
      age: enterAge,
    });
    setEnterAge("");
    setEnterUsername("");
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enterUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enterAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Fragment>
  );
}

export default AddUser;
