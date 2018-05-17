export default jqXHR => {
  let catcher = {
    errors: [],
    code: jqXHR.status
  }

  if (jqXHR.status) {
    catcher.errors.push(`Server error ${jqXHR.status}`)
  } else {
    catcher.errors.push(`Unknown server error`)
  }

  return catcher
}
