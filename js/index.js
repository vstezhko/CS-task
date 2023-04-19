window.onload = function() {

    const form = document.querySelector('.registration-form')
    const errorFields = document.querySelectorAll('.error')
    const inputFields = document.querySelectorAll('input')
    const birthdateInput = document.querySelector('#birthdate')

    const setTodayDateAsMaxBirthdate = (birthdateInput) => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        birthdateInput.max = `${year}-${month}-${day}`
    }

    setTodayDateAsMaxBirthdate(birthdateInput)

    const formValidationData = {
        firstName: {
            isFieldActivated: false,
            valid: false,
            error: '',
        },
        lastName: {
            isFieldActivated: false,
            valid: false,
            error: '',
        },
        birthdate: {
            isFieldActivated: false,
            valid: false,
            error: '',
        },
        email: {
            isFieldActivated: false,
            valid: false,
            error: '',
        },
        password: {
            isFieldActivated: false,
            valid: false,
            error: '',
        },
        confirmPassword: {
            isFieldActivated: false,
            valid: false,
            error: '',
        },
    }

    const registrationFormData = {
        firstName: '',
        lastName: '',
        birthdate: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

    const handleCheckName = (fieldId) => {

        const checkResult = {
            valid : false,
            error: ''
        }

        if (registrationFormData[fieldId].length >= 2 && registrationFormData[fieldId].length <= 25) {
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

        if (registrationFormData[fieldId].length < 8) {
            checkResult.valid = false
            checkResult.error = 'минимум 8 символов'
            return checkResult
        }

        if (!registrationFormData[fieldId].match(/[А-ЯA-Z]/)) {
            checkResult.valid = false
            checkResult.error = 'минимум 1 символ в верхнем регистре'
            return checkResult
        }

        if (!/\d/.test(registrationFormData[fieldId])) {
            checkResult.valid = false
            checkResult.error = 'минимум одна цифра 1-9'
            return checkResult
        }

        if (!registrationFormData[fieldId].match(/[@#$%!]/)) {
            checkResult.valid = false
            checkResult.error = 'минимум 1 специальный символ из перечисленных !@#$%'
            return checkResult
        }

        if (registrationFormData.password !== registrationFormData.confirmPassword && (registrationFormData.confirmPassword !== '' || registrationFormData.confirmPassword !== '')) {
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

        if (registrationFormData[fieldId].length === 0) {
            checkResult.valid = false
            checkResult.error = 'это поле обязательно для заполнения'
            return checkResult
        }

        if (!patternEmail.test(registrationFormData[fieldId])) {
            checkResult.valid = false
            checkResult.error = 'невалидный email'
            return checkResult
        }

        checkResult.valid = true
        checkResult.error = ''
        return checkResult
    }

    const handleBirthdate = (fieldId) => {
        const checkResult = {
            valid : false,
            error: ''
        }

        if (registrationFormData[fieldId] === 'Invalid Date') {
            checkResult.valid = false
            checkResult.error = 'невалидная дата'
            return checkResult
        }

        if (registrationFormData[fieldId] > new Date()) {
            checkResult.valid = false
            checkResult.error = 'не может быть больше, чем сегодня'
            return checkResult
        }

        if (registrationFormData[fieldId] < new Date('1910-01-01')) {
            checkResult.valid = false
            checkResult.error = 'невалидная дата'
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
                formValidationData[fieldId].valid = checkResultName.valid
                formValidationData[fieldId].error = checkResultName.error
                break;
            case 'lastName':
                const  checkResultLastName= handleCheckName(fieldId)
                formValidationData[fieldId].valid = checkResultLastName.valid
                formValidationData[fieldId].error = checkResultLastName.error
                break;
            case 'birthdate':
                const  checkResultBirthdate= handleBirthdate(fieldId)
                formValidationData[fieldId].valid = checkResultBirthdate.valid
                formValidationData[fieldId].error = checkResultBirthdate.error
                break;

            case 'email':
                const checkResultEmail = handleCheckEmail(fieldId)
                formValidationData[fieldId].valid = checkResultEmail.valid
                formValidationData[fieldId].error = checkResultEmail.error
                break;

            case 'password':
                const checkResultPassword = handleCheckPassword(fieldId)
                formValidationData[fieldId].valid = checkResultPassword.valid
                formValidationData[fieldId].error = checkResultPassword.error
                break;

            case 'confirmPassword':
                const checkResultConfirmPassword = handleCheckPassword(fieldId)
                formValidationData[fieldId].valid = checkResultConfirmPassword.valid
                formValidationData[fieldId].error = checkResultConfirmPassword.error
                break;
        }
    }

    const displayErrors = (fieldId) => {
        if (!formValidationData[fieldId].isFieldActivated) {
            return
        }

        let currErrorField
        errorFields.forEach(errorField => {
            if (errorField.dataset.name === fieldId) {
                currErrorField = errorField
            }
        })
        if (!formValidationData[fieldId].valid) {
            currErrorField.innerHTML = formValidationData[fieldId].error
            currErrorField.classList.add('error_shown')
        } else {
            currErrorField.classList.remove('error_shown')
        }
    }

    const handleIsActivatedFieldState = (e) => {
        let activeField = e.target.id
        formValidationData[activeField].isFieldActivated = true
    }

    const eventInputHandler = (e) => {
        if (e.target.nodeName === 'INPUT') {

            let activeField = e.target

            if (e.target.id !== 'birthdate') {
                registrationFormData[activeField.id] = e.target.value
            } else {
                registrationFormData[activeField.id] =new Date(e.target.value)
            }

            checkFieldValue(activeField, e)
            displayErrors(activeField.id)

        } else {

        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()

        Object.keys(formValidationData).forEach(field => {
            formValidationData[field].isFieldActivated = true
            formValidationData[field].error = "обязательное поле"
            console.log(formValidationData[field].isFieldActivated)
        })

        let isAllFieldsValid = true

        Object.keys(formValidationData).forEach(field => {
            console.log(formValidationData[field].valid)
            if (formValidationData[field].valid === false) {
                displayErrors(field)
                isAllFieldsValid = false
            }
        })

        if (isAllFieldsValid) {
            console.log('send data', registrationFormData)
        }
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
    form.addEventListener('submit', (e) => handleSubmitForm(e))

}