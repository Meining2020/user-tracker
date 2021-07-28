import Card from '../UI/Card.js';
import styles from './AddUser.module.css';
import Button from '../UI/Button.js';
import ErrorModal from '../UI/ErrorModal.js';

import { useState } from 'react';

const AddUser = props => {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const addUserHandlder = (event) => {
        event.preventDefault();

        if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input',
                message: 'Please enter a valid name and age (non-empty values).'
            });
            return;
        }

        if (+enteredAge < 1) {
            setError({
                title: 'Invalid age',
                message: 'Please enter a valid age (> 0).'
            });
            return;
        }
        props.onAddUser(enteredUsername, enteredAge);
        setEnteredUsername('');
        setEnteredAge('');
    }

    const usernameChangerHandler = (event) => {
        setEnteredUsername(event.target.value);
    }

    const ageChangerHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}

            <Card className={styles.input} >
                <form onSubmit={addUserHandlder}>
                    <label htmlFor="username">Username</label>
                    <input type="text" value={enteredUsername} id="username" onChange={usernameChangerHandler} />

                    <label htmlFor="age">Age (Years)</label>
                    <input type="number" value={enteredAge} id="age" onChange={ageChangerHandler} />
                    <Button type='submit'>Add User</Button>
                </form>
            </Card>
        </div>
    )
}

export default AddUser;