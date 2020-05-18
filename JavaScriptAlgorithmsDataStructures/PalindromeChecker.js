// JavaScript Algorithms and Data Structures Projects: Palindrome Checker
//
// Return true if the given string is a palindrome. Otherwise, return false.
//
// A palindrome is a word or sentence that's spelled the same way both forward and backward,
// ignoring punctuation, case, and spacing.
//
// Note:
//
//    * You'll need to remove all non-alphanumeric characters (punctuation, spaces and symbols)
//      and turn everything into the same case (lower or upper case) in order to check for palindromes.
//
//    * We'll pass strings with varying formats, such as "racecar", "RaceCar", and "race CAR" among others.
//
//    * We'll also pass strings with special symbols, such as "2A3*3a2", "2A3 3a2", and "2_A3*3#A2".


function palindrome(str) {
    let forward = str.replace(/[_\W]/g, "").toLowerCase()
    let backward = forward.split("").reverse().join("")
    return forward == backward;
}


function check(input, expect) {
    console.log((expect == palindrome(input)) ? "\u2713" : "x", `"${input}" should return ${expect}.`)
}


check("eye", true)
check("_eye", true)
check("race car", true)
check("not a palindrome", false)
check("A man, a plan, a canal. Panama", true)
check("never odd or even", true)
check("nope", false)
check("almostomla", false)
check("My age is 0, 0 si ega ym.", true)
check("1 eye for of 1 eye.", false)
check("0_0 (: /-\ :) 0-0", true)
check("five|\_/|four", false)