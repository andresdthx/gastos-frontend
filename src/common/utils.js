const convertValue = (value) => {
    return new Intl.NumberFormat().format(value)
}

module.exports = { convertValue }