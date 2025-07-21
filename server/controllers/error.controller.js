const getErrorMessage = (err) => {
  let message = ''

  if (err.code) {
    // Duplicate email error
    if (err.code === 11000 || err.code === 11001) {
      message = 'Email already exists'
    } else {
      message = 'Something went wrong'
    }
  } else {
    // Loop through validation errors
    for (let errName in err.errors) {
      if (err.errors[errName].message)
        message = err.errors[errName].message
    }
  }

  return message || 'Unknown error'
}

const handleError = (req, res) => {
  res.status(500).json({ error: 'Internal Server Error' })
}

export default { getErrorMessage, handleError }
