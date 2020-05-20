// JavaScript Algorithms and Data Structures Projects: Cash Register
//
// Design a cash register drawer function checkCashRegister() that accepts
// purchase price as the first argument (price), payment as the second
// argument (cash), and cash-in-drawer (cid) as the third argument.
//
// cid is a 2D array listing available currency.
//
// The checkCashRegister() function should always return an object with a status key and a change key.
//
// Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due,
// or if you cannot return the exact change.
//
// Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change
// if it is equal to the change due.
//
// Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in
// highest to lowest order, as the value of the change key.
//
// Currency Unit        | Amount
// --------------------------------------
// Penny	            | $0.01 (PENNY)
// Nickel	            | $0.05 (NICKEL)
// Dime	                | $0.1 (DIME)
// Quarter	            | $0.25 (QUARTER)
// Dollar	            | $1 (ONE)
// Five Dollars	        | $5 (FIVE)
// Ten Dollars	        | $10 (TEN)
// Twenty Dollars       | $20 (TWENTY)
// One-hundred Dollars  | $100 (ONE HUNDRED)

// See below for an example of a cash-in-drawer array:

// [
//   ["PENNY", 1.01],
//   ["NICKEL", 2.05],
//   ["DIME", 3.1],
//   ["QUARTER", 4.25],
//   ["ONE", 90],
//   ["FIVE", 55],
//   ["TEN", 20],
//   ["TWENTY", 60],
//   ["ONE HUNDRED", 100]
// ]

function checkCashRegister(price, cash, cid) {

    let unit = ["PENNY", "NICKEL", "DIME", "QUARTER", "ONE", "FIVE", "TEN", "TWENTY", "ONE HUNDRED"].reverse()
    let amounts = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100].reverse()

    let change_coins = {
        "PENNY": 0,
        "NICKEL": 0,
        "DIME": 0,
        "QUARTER": 0,
        "ONE": 0,
        "FIVE": 0,
        "TEN": 0,
        "TWENTY": 0,
        "ONE HUNDRED": 0
    };


    let change = cash - price

    let regist_coins = {}
    let regist_amount = 0

    for (let i in cid) {
        regist_coins[cid[i][0]] = cid[i][1]
        regist_amount += cid[i][1]
    }

    for (let i = 0; i < amounts.length;) {
        let coin = unit[amounts.indexOf(amounts[i])]
        if (amounts[i] <= change && regist_coins[coin] > 0) {
            change_coins[coin] += amounts[i]
            regist_coins[coin] -= amounts[i]
            change = change - amounts[i]
            change = Math.round(100 * change) / 100;
            regist_amount -= amounts[i]
            i = 0
        } else {
            i++;
        }
    }

    let change_to_customer = []
    let status = ""

    if (change != 0) {
        status = "INSUFFICIENT_FUNDS"
    } else if (regist_amount < 0) {
        status = "CLOSED"
        change_to_customer = cid
    } else {
        status = "OPEN"
        for (let i in unit) {
            let u = unit[i]
            if (change_coins[u] > 0) {
                change_to_customer.push([u, Math.round(100 * change_coins[u]) / 100])
            }
        }
    }

    return {
        "status": status,
        "change": change_to_customer
    };
}


function check(input0, input1, input2, expect) {
    let result = JSON.stringify((checkCashRegister(input0, input1, input2)))
    expect = JSON.stringify(expect)
    input2 = JSON.stringify(input2)
    console.log((expect === result) ? "\u2713" : "x", `"${input0}, ${input1}, ${input2}" should return ${expect}.`)

}

check(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
], {
    status: "OPEN",
    change: [
        ["QUARTER", 0.5]
    ]
})

check(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
], {
    status: "OPEN",
    change: [
        ["TWENTY", 60],
        ["TEN", 20],
        ["FIVE", 15],
        ["ONE", 1],
        ["QUARTER", 0.5],
        ["DIME", 0.2],
        ["PENNY", 0.04]
    ]
})

check(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
], { status: "INSUFFICIENT_FUNDS", change: [] })

check(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
], { status: "INSUFFICIENT_FUNDS", change: [] })

check(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
], {
    status: "CLOSED",
    change: [
        ["PENNY", 0.5],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
    ]
})