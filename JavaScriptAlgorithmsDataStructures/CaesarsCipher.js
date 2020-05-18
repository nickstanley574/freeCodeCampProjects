// Caesars Cipher
//
// One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher.
// In a shift cipher the meanings of the letters are shifted by some set amount.
//
// A common modern use is the ROT13 cipher, where the values of the letters are
// shifted by 13 places. Thus 'A' ↔ 'N', 'B' ↔ 'O' and so on.
//
// Write a function which takes a ROT13 encoded string as input and returns a decoded string.
//
// All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces,
// punctuation), but do pass them on.

function rot13(str) {
    let shift = 13
    let abcs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
    let abcShifted = abcs.slice(shift).concat(abcs.slice(0, shift));

    return str.split('').map(c => {
        let char = abcs[abcShifted.indexOf(c)]
        if (char == undefined) { char = c }
        return char
    }).join('')

}

function check(input, expect) {
    console.log((expect == rot13(input)) ? "\u2713" : "x", `"${input}" should return '${expect}'.`)
}

check("SERR PBQR PNZC", "FREE CODE CAMP")
check("SERR CVMMN!", "FREE PIZZA!")
check("SERR YBIR?", "FREE LOVE?")
check("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.", "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.")