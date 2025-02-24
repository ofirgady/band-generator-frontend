import { utilService } from '../src/services/util.service.js'

describe('utilService', () => {
	describe('calculateStatistics', () => {
		it('should count words starting with a capital letter', () => {
			const text = 'Hello world. This is a Test.'
			const { capitalWords } = utilService.calculateStatistics(text)
			expect(capitalWords).toBe(3) // Hello, This, Test
		})
	})

	describe('isYearEven', () => {
		it('should identify the selected year as even', () => {
			const year = new Date('2022-01-01')
			const result = utilService.isYearEven(year)
			expect(result).toBe(true)
		})

		it('should identify the selected year as odd', () => {
			const year = new Date('2021-01-01')
			const result = utilService.isYearEven(year)
			expect(result).toBe(false)
		})
	})
})
