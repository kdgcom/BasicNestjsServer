const __errors: Record<string|number, any> = {
  ERR_SOMETHING:
  {
    errorCode: 10000,
    msg: "Error message"
  },
  ERR_ANOTHER:
  {
    errorCode: 10001,
    msg: "Error message for another error"
  }
}

export default __errors;