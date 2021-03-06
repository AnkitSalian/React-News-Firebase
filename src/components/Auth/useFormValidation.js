import { useEffect, useState } from "react";

function useFormValidation(initialState, validate, authenticate) {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (submitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                authenticate();
            }
            setSubmitting(false);
        }
    }, [errors])

    function handleChange(event) {
        event.persist();
        setValues(prevValues => ({
            ...prevValues,
            [event.target.name]: event.target.value

        }))
    }

    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }

    return { handleBlur, handleChange, handleSubmit, values, errors, submitting };
}

export default useFormValidation;
