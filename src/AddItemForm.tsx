import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import classes from "./TodoList.module.css";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState("")
    const [error, setValidationError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setValidationError(null)

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
            setValidationError("Title is required")
        }

    }

    return (
        <div className={classes.addItemForm}>
            <TextField

                size={"small"}
                // className={validationError ? classes.error : ''} ??? как сделать то
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                label={"Enter title"}
                error={!!error}
                helperText={error && "Title is required"}
            />
            <IconButton
                onClick={addItem}
                size={"small"}
                color={"primary"}
            >
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
};

export default AddItemForm;