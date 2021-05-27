export default function validateCreateLink(values) {
    let errors = {};

    if (!values.description) {
        errors.description = "Description Required";
    } else if (values.description.length < 10) {
        errors.description = "Description must be atleast 10 characters";
    }

    if (!values.url) {
        errors.url = "url Required";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "Invalid URL";
    }

    return errors;
}
