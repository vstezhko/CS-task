window.onload = function() {

    let isFieldActivated = {
        firstName: false,
        lastName: false,
        birthdate: false,
        email: false,
        password: false,
        confirmPassword: false,
    }

    let formData = {
        firstName: {
            value: '',
            valid: false,
            error: '',
        },
        lastName: {
            value: '',
            valid: false,
            error: '',
        },
        birthdate: {
            value: '',
            valid: false,
            error: '',
        },
        email: {
            value: '',
            valid: false,
            error: '',
        },
        password: {
            value: '',
            valid: false,
            error: '',
        },
        confirmPassword: {
            value: '',
            valid: false,
            error: '',
        },
    }

// const setDateValue = (field, e) => {
//     const fieldId = field.id
//     const mask = new RegExp("^(0[1-9]|[12][0-9]|3[01])?-(0[1-9]|1[012])?-(19|20)?\\d{2}?$")
//     let formattedValue = "";
//     let value = e.target.value
//
//     if (value.length === 2 || value.length === 7 || value.length === 14) {
//         console.log(mask.test(value))
//     }
//
//     for (let i = 0; i < mask.length; i++) {
//         const maskChar = mask[i];
//         const inputChar = value[i];
//         if (!inputChar) {
//             break;
//         }
//
//         if (/\d/.test(inputChar)) {
//             formattedValue += inputChar;
//             if (formattedValue.length === 2 || formattedValue.length === 5) {
//                 formattedValue += "-";
//             }
//         }
//     }
//
//     let parts = formattedValue.split("-");
//     let year = parts[2];
//     let month = parts[1] - 1;
//     let day = parts[0];
//
//
//     field.value = formattedValue
//
//
//     let date = new Date(year, month, day);
//
//     formData[fieldId].value = date
//     console.log(formData[fieldId])
// }


    const handleCheckName = (fieldId) => {

        const checkResult = {
            valid : false,
            error: ''
        }

        if (formData[fieldId].value.length >= 2 && formData[fieldId].value.length <= 25) {
            checkResult.valid = true
        } else {
            checkResult.valid = false
            checkResult.error = "мин. кол-во символов - 2"
        }

        return checkResult
    }

    const handleCheckPassword = (fieldId) => {

        const checkResult = {
            valid : false,
            error: ''
        }

        if (formData[fieldId].value.length < 8) {
            checkResult.valid = false
            checkResult.error = 'минимум 8 символов'
            return checkResult
        }

        if (!formData[fieldId].value.match(/[А-ЯA-Z]/)) {
            checkResult.valid = false
            checkResult.error = 'минимум 1 символ в верхнем регистре'
            return checkResult
        }

        if (!/\d/.test(formData[fieldId].value)) {
            checkResult.valid = false
            checkResult.error = 'минимум одна цифра 1-9'
            return checkResult
        }

        if (!formData[fieldId].value.match(/[@#$%!]/)) {
            checkResult.valid = false
            checkResult.error = 'минимум 1 специальный символ из перечисленных !@#$%'
            return checkResult
        }

        if (formData[fieldId].value !== formData.confirmPassword.value && formData.confirmPassword.value !== '' && formData.confirmPassword.value !== '') {
            checkResult.valid = false
            checkResult.error = 'введенные пароли не совпадают'
            return checkResult
        }

        checkResult.valid = true
        checkResult.error = ''
        return checkResult
    }

    const handleCheckEmail = (fieldId) => {
        const checkResult = {
            valid : false,
            error: ''
        }

        const patternEmail = new RegExp( /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)

        if (formData[fieldId].value.length === 0) {
            checkResult.valid = false
            checkResult.error = 'это поле обязательно для заполнения'
            return checkResult
        }

        if (!patternEmail.test(formData[fieldId].value)) {
            checkResult.valid = false
            checkResult.error = 'невалидный email'
            return checkResult
        }

        checkResult.valid = true
        checkResult.error = ''
        return checkResult
    }

    const checkFieldValue = (field, e) => {
        const fieldId = field.id
        switch(fieldId) {
            case 'firstName':
                const  checkResultName= handleCheckName(fieldId)
                formData[fieldId].valid = checkResultName.valid
                formData[fieldId].error = checkResultName.error
                break;
            case 'lastName':
                const  checkResultLastName= handleCheckName(fieldId)
                formData[fieldId].valid = checkResultLastName.valid
                formData[fieldId].error = checkResultLastName.error
                break;
            case 'birthdate':
                break;

            case 'email':
                const checkResultEmail = handleCheckEmail(fieldId)
                formData[fieldId].valid = checkResultEmail.valid
                formData[fieldId].error = checkResultEmail.error
                break;

            case 'password':
                const checkResultPassword = handleCheckPassword(fieldId)
                formData[fieldId].valid = checkResultPassword.valid
                formData[fieldId].error = checkResultPassword.error
                break;

            case 'confirmPassword':
                const checkResultConfirmPassword = handleCheckPassword(fieldId)
                formData[fieldId].valid = checkResultConfirmPassword.valid
                formData[fieldId].error = checkResultConfirmPassword.error
                break;
        }
    }


    const firstName = document.querySelector('#firstName')
    const secondName = document.querySelector('#lastName')
    const birthdate = document.querySelector('#birthdate')
    const email = document.querySelector('#email')
    const password = document.querySelector('#password')
    const confirmPassword = document.querySelector('#confirmPassword')

    const form = document.querySelector('.registration-form')
    const errorFields = document.querySelectorAll('.error')
    const inputFields = document.querySelectorAll('input')


    const displayErrors = (fieldId) => {
        if (!isFieldActivated[fieldId]) {
            return
        }

        let currErrorField
        errorFields.forEach(errorField => {
            if (errorField.dataset.name === fieldId) {
                currErrorField = errorField
            }
        })
        if (!formData[fieldId].valid) {
            currErrorField.innerHTML = formData[fieldId].error
            currErrorField.classList.add('error_shown')
        } else {
            currErrorField.classList.remove('error_shown')
        }
    }

    const eventInputHandler = (e) => {
        if (e.target.nodeName === 'INPUT') {

            let activeField = e.target

            if (e.target.id !== 'birthdate') {
                formData[activeField.id].value = e.target.value
            } else {
                // setDateValue(activeField, e)
            }

            checkFieldValue(activeField, e)
            displayErrors(activeField.id)

        } else {

        }
    }

    const handleIsActivatedFieldState = (e) => {
        let activeField = e.target.id
        isFieldActivated[activeField] = true
    }




    form.addEventListener('click', (e) => eventInputHandler(e));
    form.addEventListener('keyup', (e) => eventInputHandler(e));
    form.addEventListener('input', (e) => eventInputHandler(e));
    inputFields.forEach(input => {
        input.addEventListener('blur', (e) => {
            handleIsActivatedFieldState(e)
            eventInputHandler(e)
        })
    })






}