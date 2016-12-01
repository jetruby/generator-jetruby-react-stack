export const email = {
  presence: true,
  email: { message: 'must be valid' }
}

export const extraEmail = {
  email: { message: 'must be valid' }
}

export const otherEmail = {
  equality: {
    attribute: 'email',
    message: 'is not different',
    comparator(firstEmail, secondEmail) {
      return firstEmail !== secondEmail
    }
  }
}

export const password = {
  presence: true,
  length: {
    minimum: 6,
    message: 'must be at least 6 characters'
  }
}

export const passwordConfirmation = {
  presence: true,
  equality: 'password'
}

export const newPasswordConfirmation = {
  presence: true,
  equality: 'newPassword'
}

export const accountActivation = {
  presence: true,
  format: {
    pattern: /^\d{6}$/,
    message: 'Please, enter valid activation code'
  }
}

export const numberValue = {
  presence: true,
  format : {
    pattern: /^\+?(|[1-9]\d*)$/,
    message: '- incorrect, enter valid value'
  }
}

export const zipCode = {
  presence: true,
  format : {
    pattern: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
    message: '- incorrect, enter valid value'
  }
}

/*eslint-disable  */
export const cardNumber = {
  presence: true,
  format : {
    pattern: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    message: '- incorrect, enter valid value'
  }
}

export const cvv2 = {
  presence: true,
  format : {
    pattern: /^[0-9]{3,4}$/,
    message: '- incorrect, enter valid value'
  }
}

export const owner = {
  presence: true,
  format : {
    pattern: /^[a-zA-Z-'. ]+$/,
    message: '- incorrect, enter valid value'
  }
}
/*eslint-enable  */

