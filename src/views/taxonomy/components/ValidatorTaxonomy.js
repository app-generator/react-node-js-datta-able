import { validateFieldText, validateLength, isEmpty } from "../../../utils/validators"

const validateName = (name) =>{
    return (validateFieldText(name) && validateLength(name, 100) && !isEmpty(name))
}


const validateDescription = (description) =>{
    return (!isEmpty(description))
}

const validateType = (description) =>{
    return (validateLength(description, 250) && !isEmpty(description))
}

export {validateName, validateDescription, validateType}