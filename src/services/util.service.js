export const utilService = {
	makeId,
	saveToStorage,
	loadFromStorage,
	debounce,
	calculateStatistics,
	isYearEven,
}

// Generate a random ID
function makeId(length = 5) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	return Array.from({ length }, () =>
		possible.charAt(Math.floor(Math.random() * possible.length))
	).join('')
}

// Save data to local storage
function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

// Load data from local storage
function loadFromStorage(key, defaultValue = null) {
	const value = localStorage.getItem(key)
	return value ? JSON.parse(value) : defaultValue
}

// Debounce function
export function debounce(func, delay) {
	let timeoutId
	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

// Calculate statistics from text
function calculateStatistics(text) {
	const words = text.split(/\s+/)
	const capitalWords = words.filter((word) => /^[A-Z]/.test(word)).length
	const wordsWithNumbers = words.filter((word) => /\d/.test(word)).length
	return { capitalWords, wordsWithNumbers }
}

// Check if the year is even
function isYearEven(year) {
	return year.getFullYear() % 2 === 0
}
