import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import classes from "./TodoList.module.css";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem();
        }
    }

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required")
        }

    }

    return (
        <div className={classes.addItemForm}>
            <input
                className={error ? classes.error : ''}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
        </div>
    );
};

export default AddItemForm;