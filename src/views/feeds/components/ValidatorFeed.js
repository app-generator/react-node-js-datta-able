import { validateFieldText, validateLength, isEmpty } from "../../../components/Validator/validators"

const validateName = (name) =>{
    return (validateFieldText(name) && validateLength(name, 100) && !isEmpty(name))
}


const validateDescription = (description) =>{
    return (validateLength(description, 250) && !isEmpty(description))
}

export {validateName, validateDescription}