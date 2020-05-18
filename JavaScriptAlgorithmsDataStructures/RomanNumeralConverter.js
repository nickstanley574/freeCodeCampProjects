// JavaScript Algorithms and Data Structures Projects: Roman Numeral Converter
//
// Convert the given number into a roman numeral. All roman numerals answers should be provided in upper-case.



function convertToRoman(goal) {

    let numbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let result = "";

    for (let i in numbers) {
        let number = numbers[i]
        while (number <= goal) {
            goal -= number;
            result += symbols[i]
        }
    }
    return result;
};



function check(input, expect) {
    console.log((expect == convertToRoman(input)) ? "\u2713" : "x", `"${input}" should return ${expect}.`)
}

check(2, "II")
check(3, "III")
check(4, "IV")
check(5, "V")
check(9, "IX")
check(12, "XII")
check(16, "XVI")
check(29, "XXIX")
check(44, "XLIV")
check(45, "XLV")
check(68, "LXVIII")
check(83, "LXXXIII")
check(97, "XCVII")
check(99, "XCIX")
check(400, "CD")
check(500, "D")
check(501, "DI")
check(649, "DCXLIX")
check(798, "DCCXCVIII")
check(891, "DCCCXCI")
check(1000, "M")
check(1004, "MIV")
check(1006, "MVI")
check(1023, "MXXIII")
check(2014, "MMXIV")
check(3999, "MMMCMXCIX")