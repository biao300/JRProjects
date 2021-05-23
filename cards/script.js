// leetcode 1. Two Sum
function twoSum(nums, target) {
    // todo
    let i = 0, j = 1;
    for (i = 0; i < nums.length - 1; i++) {
        for (j = i + 1; j < nums.length; j++) {
            console.log(i + ", " + j);
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}

//console.log(twoSum([3, 2, 3], 6));


// leetcode 7. Reverse Integer 123=>321
var reverse = function (x) {
    let op = 1;
    let str = "";
    let ret = 0;

    if (x < 0) {
        op = -1;
        x *= -1;
    }

    do {
        y = Math.trunc(x % 10);
        if (y === 0 && x === 10) {
            // x is 10
            y = 1;
        }

        str += y;
        x /= 10;
    } while (x > 1)

    ret = parseInt(str) * op;
    if (ret > 2 ** 31 - 1 || ret < (-2) ** 31) {
        ret = 0;
    }

    return ret;
};

//console.log(reverse(123450));


// leetcode 9. Palindrome 0,11,121,12321...
var isPalindrome = function (x) {
    let ret = false;
    let str = "" + x;

    console.log("is " + x + " palindrome? ")

    if (0 < x && x < 2 ** 31 - 1) {
        for (let i = 0; i < str.length / 2; i++) {
            if (str[i] === str[str.length - 1 - i]) {
            } else {
                return false;
            }
        }
        ret = true;
    } else if (x === 0) {
        ret = true;
    }

    return ret;
};

//console.log(isPalindrome(12321));


// 13. Roman to Integer
var romanToInt = function (s) {

    const roman = [
        // [0] ~ [5]
        { letter: 'IV', value: 4 },
        { letter: 'IX', value: 9 },
        { letter: 'XL', value: 40 },
        { letter: 'XC', value: 90 },
        { letter: 'CD', value: 400 },
        { letter: 'CM', value: 900 },
        // [6] ~ [12]
        { letter: 'I', value: 1 },
        { letter: 'V', value: 5 },
        { letter: 'X', value: 10 },
        { letter: 'L', value: 50 },
        { letter: 'C', value: 100 },
        { letter: 'D', value: 500 },
        { letter: 'M', value: 1000 },
    ];

    let arabic = 0;

    let i = 0;
    let j = 0;
    let found2 = false;

    if (s.length > 1) {
        // more than one letter
        for (i = 0; i < s.length; i++) {
            if (s[i + 1] !== undefined) {

                found2 = false;

                for (j = 0; j < 6; j++) {
                    if (s[i] + s[i + 1] === roman[j].letter) {
                        arabic += roman[j].value;
                        found2 = true;
                        i++;
                        break;
                    }
                }

                if (found2 == false) {
                    for (; j < 13; j++) {
                        if (s[i] === roman[j].letter) {
                            arabic += roman[j].value;
                            break;
                        }
                    }
                }
            }
            else {
                // last letter
                for (j = 6; j < 13; j++) {
                    if (s[i] === roman[j].letter) {
                        arabic += roman[j].value;
                        break;
                    }
                }
            }
        }
    } else {
        // only one letter
        for (j = 6; j < 13; j++) {
            if (s[0] === roman[j].letter) {
                arabic += roman[j].value;
                break;
            }
        }
    }
    //console.log(roman[0]);

    return arabic;
};

//console.log(romanToInt("IV"));


// 14. longest Common Prefix
var longestCommonPrefix = function (strs) {
    let prefix = "";
    let i = 0;
    let j = 0;

    let a = "";
    let found = true;
    let endWord = false;

    if (strs.length > 1) {
        while (!endWord) {

            a = strs[0][i];
            if (a === undefined) {
                break;
            }
            found = true;

            for (j = 0; j < strs.length; j++) {
                console.log("strs[" + j + "][" + i + "]" + strs[j][i]);

                if (strs[j][i] !== undefined) {
                    if (a !== strs[j][i]) {
                        found = false;
                        endWord = true;
                        break;
                    }
                }
                else {
                    endWord = true;
                    break;
                }
            }

            if (found && !endWord) {
                prefix += a;
            }

            i++;
        }
    } else if (strs.length === 1) {
        if (strs[0][0] !== undefined) {
            prefix = strs[0][0];
        }
    } else {

    }

    return prefix;
};

//console.log(longestCommonPrefix(["flower", "flow", "flight"]));




//20. Valid Parentheses
var isValid = function (s) {
    let ret = false;

    let arr = [];
    let i = 0;

    console.log("1 ==>" + arr.length);

    for (i = 0; i < s.length; i++) {
        switch (s[i]) {
            case "(":
            case "[":
            case "{":
                arr.push(s[i]);
                break;

            case ")":
                if (arr.length > 0 && arr[arr.length - 1] === "(") {
                    arr.pop();
                } else {
                    return false;
                }
                break;

            case "]":
                if (arr.length > 0 && arr[arr.length - 1] === "[") {
                    arr.pop();
                } else {
                    return false;
                }
                break;

            case "}":
                if (arr.length > 0 && arr[arr.length - 1] === "{") {
                    arr.pop();
                } else {
                    return false;
                }
                break;

            default:
                break;
        }

        console.log(arr);
    }

    ret = (arr.length === 0);

    return ret;
};

//console.log(isValid("{}[]()"));


// 21. Merge Two Sorted Lists
var mergeTwoLists = function (l1, l2) {
    let ret = [];

    let len = l1.length > l2.length ? l1.length : l2.length;
    let i;

    for (i = 0; i < len; i++) {

    }

    return ret;
};

// test array
let arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

console.log(arr);

arr.pop(); // remove last
console.log("pop arr");
console.log(arr);

arr.push("12"); // add last
console.log("push arr");
console.log(arr);

arr.shift(); // remove first
console.log("shift arr");
console.log(arr);

arr.unshift("-1"); // add first
console.log("unshift arr");
console.log(arr);

