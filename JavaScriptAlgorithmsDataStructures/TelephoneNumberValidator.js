//JavaScript Algorithms and Data Structures Projects: Telephone Number Validator

// Return true if the passed string looks like a valid US phone number.

// The user may fill out the form field any way they choose as long as it has the
// format of a valid US number. The following are examples of valid formats for US
// numbers (refer to the tests below for other variants):

//     555-555-5555
//     (555)555-5555
//     (555) 555-5555
//     555 555 5555
//     5555555555
//     1 555 555 5555

// For this challenge you will be presented with a string such as 800-692-7753 or
// 8oo-six427676;laskdjf. Your job is to validate or reject the US phone number
// based on any combination of the formats provided above. The area code is required.
// If the country code is provided, you must confirm that the country code is 1.
// Return true if the string is a valid US phone number; otherwise return false.

function telephoneCheck(str) {
    return /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/.test(str);
}


function check(input, expect) {
    console.log((expect == telephoneCheck(input)) ? "\u2713" : "x", `"${input}" should return '${expect}'.`)
}

check("555-555-5555", true)
check("1 555-555-5555", true)
check("1 (555) 555-5555", true)
check("5555555555", true)
check("(555)555-5555", true)
check("1(555)555-5555", true)
check("555-5555", false)
check("5555555", false)
check("1 555)555-5555", false)
check("1 555 555 5555", true)
check("1 456 789 4444", true)
check("123**&!!asdf#", false)
check("55555555", false)
check("(6054756961)", false)
check("2 (757) 622-7382", false)
check("0 (757) 622-7382", false)
check("-1 (757) 622-7382", false)
check("2 757 622-7382", false)
check("10 (757) 622-7382", false)
check("27576227382", false)
check("(275)76227382", false)
check("2(757)6227382", false)
check("2(757)622-7382", false)
check("555)-555-5555", false)
check("(555-555-5555", false)
check("(555)5(55?)-5555", false)