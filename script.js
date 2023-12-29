/** @format */

// let str = 'message'
// const obj = {}
// for (let i = 0; i < str.length; i++) {
// 	if (obj[str[i]]) {
// 		obj[str[i]] = obj[str[i]] + 1
// 	} else {
// 		obj[str[i]] = 1
// 	}
// }
// console.log(obj)

// const str = 'pankaj kumar'
// let a = ''
// const len = str.length - 1
// console.log(len)
// for (let i = len; i >= 0; i--) {
// 	console.log(str[i])
// 	a += str[i]
// 	// console.log(a)
// 	// a = a + str[i]
// }
// console.log(a)

// const str = 'computerp'
// const arr = str.split('')
// console.log(arr)
// const len = arr.length
// const dive = len / 2
// console.log(dive)
// console.log(len)

// for (let i = 0; i < len / 2; i++) {
// 	console.log(i)
// 	let ch = arr[i]
// 	arr[i] = arr[len - 1 - i]
// 	arr[len - 1 - i] = ch
// }
// console.log(arr.join(''))

// const str = 'message'
// const obj = {}
// for (let i = 0; i < str.length; i++) {
// 	const ch = str[i]
// 	console.log(ch)
// 	if (!obj[ch]) {
// 		obj[ch] = 0
// 	}
// 	obj[ch]++
// }
// console.log(obj)

// console.log(false == false)

// const arr = [19, 70, 65, 4, 8, 5, 0, 21, 7, 22, 1, 4]

// function findSecondLargest(arr) {
// 	let max = -Infinity
// 	let secondMax = -Infinity

// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i] > max) {
// 			secondMax = max
// 			max = arr[i]
// 		} else if (arr[i] > secondMax && arr[i] !== max) {
// 			secondMax = arr[i]
// 		}
// 	}

// 	return secondMax
// }

// const secondLargest = findSecondLargest(arr)
// console.log('The second largest number is:', secondLargest)

// fetch('https://dummyjson.com/pro?ducts')
// 	.then((data) => {
// 		return data.json()
// 	})
// 	.then((data) => {
// 		console.log(data)
// 	})
// 	.catch((e) => {
// 		console.log(e)
// 	})

// fetch('https://dummyjson.com/products').then((res) => {
// 	console.log(res.json())
// })

// .then((data) => {
// 	console.log(data)
// })
// .catch((e) => {
// 	console.log(e)
// })

// Create a function that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.
// function evenodd(num) {
// 	if (num & 1) {
// 		console.log('odd number')
// 	} else {
// 		console.log('even number')
// 	}
// }
// evenodd(3)

// const arr = [19, 70, 65, 4, 8, 5, 0, 21, 7, 22, 1, 4]

// let max = arr[0]
// for (let i = 1; i <= arr.length - 1; i++) {
// 	// console.log(arr[i])
// 	if (arr[i] > max) {
// 		max = arr[i]
// 	}
// }
// console.log(max)
// function caracteroccurance(str) {
// 	const obj = {}
// 	str.split('').forEach((ele) => {
// 		obj[ele] = obj[ele] ? obj[ele] + 1 : 1
// 		// console.log(obj)
// 	})
// 	console.log(obj)
// 	// let max = str[0]
// 	for (let key in obj) {
// 		console.log(obj[key])
// 		// if (obj[key] > max) {
// 		// 	max = obj[key]
// 		// }
// 	}
// 	// return max
// }
// const res = caracteroccurance('HelloWorlddd')
// console.log(res)

// var a = 10
// function demo() {
// 	console.log(a)
// 	var a = 50
// 	console.log(a)
// }
// demo()
// console.log(a)

// let lang = ['html', 'css', 'js']
// let newlang =
// console.log(newlang)
// newlang.push('php')
// console.log(lang)

// const originalObject = { a: 1, b: { c: 2 } }
// const deepCopyObject = JSON.parse(JSON.stringify(originalObject))
// deepCopyObject.b.c = 3   //! updating the exting key value
// deepCopyObject.b.d = 4   //! adding a new key value
// console.log(originalObject)
// console.log(deepCopyObject)

// const _ = require('lodash')

// const originalObject = { a: 1, b: { c: 2 } }
// let deepCopy = _.cloneDeep(originalObject)
// console.log(deepCopy)

// const arr = [10, 20, 30, 40, 50]
// const newArr = arr
// 	.map((val) => {
// 		return val * 2
// 	})
// 	.filter((val) => {
// 		return val > 50
// 	})
// 	.reduce((accu, currval) => {
// 		return accu + currval
// 	})
// console.log(newArr)

// const string = 'Hello, hello, hello, how are you?'
// const substring = 'hello'

// let count = 0
// let index = string.indexOf(substring)

// while (index !== -1) {
// 	count++
// 	index = string.indexOf(substring, index + 1)
// }

// console.log(`Number of occurrences of '${substring}' in the string: ${count}`)

// ! find the occurance of number of word in a sentence

// const string = 'Hello, hello, hello, how are you?'
// const substring = 'hello'

// const occurrences = string.split(substring).length - 1
// console.log(
// 	`Number of occurrences of '${substring}' in the string: ${occurrences}`
// )

//? find occurance of letter in a string

// const string = 'Hello there'
// const letter = 'e'
// let count = 0
// for (let i = 0; i < string.length; i++) {
// 	if (string[i].toLowerCase() === letter) {
// 		count++
// 	}
// }
// console.log(count)

// function maxOccurringCharacter(str) {
// 	let maxChar = ''
// 	let maxCount = 0

// 	for (let i = 0; i < str.length; i++) {
// 		let count = 0
// 		const currentChar = str[i]

// 		for (let j = 0; j < str.length; j++) {
// 			if (str[j] === currentChar) {
// 				count++
// 			}
// 		}

// 		if (count > maxCount) {
// 			maxCount = count
// 			maxChar = currentChar
// 		}
// 	}

// 	return maxChar
// }

// Test the function
// const text = 'hello worldddd'
// const maxChar = maxOccurringCharacter(text)
// console.log(`The character '${maxChar}' occurs the most in the string.`)

// function nextPalidrome(value) {
// 	let sum = 0
// 	let rem = 0
// 	let temp
// 	while (true) {
// 		value++
// 		temp = value

// 		sum = rem = 0

// 		while (temp > 0) {
// 			rem = temp % 10
// 			sum = sum * 10 + rem
// 			temp /= 10
// 		}
// 		if (value == sum) return value
// 	}
// }

// console.log(nextPalidrome(121))