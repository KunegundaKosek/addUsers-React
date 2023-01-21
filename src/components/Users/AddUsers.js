import React, { useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUsers.module.css';

const AddUsers = (props) => {

    const [enteredName, setEnteredName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandler = (e) => {
        e.preventDefault();

        if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: "Niepoprawne dane",
                message: "Wprowadź prawidłowe imię i wiek (pole nie może być puste)."
            });
            return;
        };

        if (+enteredAge < 1) {
            setError({
                title: "Niepoprawny wiek",
                message: "Podaj poprawny wiek (> 0)."
            });
        };

        props.onAddUsers(enteredName, enteredAge);

        setEnteredName('');
        setEnteredAge('');
    };

    const usernameChangeHandler = (e) => {
        setEnteredName(e.target.value);
    };

    const userageChangeHandler = (e) => {
        setEnteredAge(e.target.value);
    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />)
            }

            <Card className={classes.input}>
                <form onSubmit={addUserHandler}>
                    <label htmlFor='name'>Imię użytkownika: </label>
                    <input type='text' value={enteredName} onChange={usernameChangeHandler} />

                    <label htmlFor='age'>Wiek: </label>
                    <input type='number' value={enteredAge} onChange={userageChangeHandler} />

                    <Button type='submit'>DODAJ</Button>
                </form>
            </Card>
        </>
    );
};

export default AddUsers;