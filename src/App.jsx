import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { openaiService } from './services/openai.service.js'
import { loadBand, fetchBand } from './store/band.actions'
import './styles/App.css'
import DatePicker from 'react-datepicker'
import { utilService } from './services/util.service.js'

function App() {
	const bandData = useSelector((storeState) => storeState.bandModule.band)
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [text, setText] = useState('Your Band Description...')
	const [imageUrl, setImageUrl] = useState('')
	const [loading, setLoading] = useState(false)
	const [year, setYear] = useState(new Date())
	const [capitalWordsCount, setCapitalWordsCount] = useState(0)
	const [wordsFollowedByNumbersCount, setWordsFollowedByNumbersCount] = useState(0)
	const [isYearEven, setIsYearEven] = useState(true)
	const [errors, setErrors] = useState({})

	// Fetch band data on component mount
	useEffect(() => {
		fetchBand()
	}, [])

	// Update state when bandData changes
	useEffect(() => {
		if (bandData) {
			setName(bandData.name)
			setDescription(bandData.description)
			setYear(new Date(bandData.year))
			setText(bandData.desc)
			setImageUrl(bandData.imgUrl)
		}
	}, [bandData])

	// Calculate statistics when text changes
	useEffect(() => {
		const { capitalWords, wordsWithNumbers } = utilService.calculateStatistics(text)
		setCapitalWordsCount(capitalWords)
		setWordsFollowedByNumbersCount(wordsWithNumbers)
	}, [text])

	// Check if the year is even when year changes
	useEffect(() => {
		setIsYearEven(utilService.isYearEven(year))
	}, [year])

	// Validate form inputs
	const validateForm = () => {
		const newErrors = {}
		if (!name) newErrors.name = 'Name is required'
		if (!description) newErrors.description = 'Description is required'
		else if (!description.includes(',')) newErrors.description = 'Description must include a comma'
		if (!year) newErrors.year = 'Year is required'
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!validateForm()) return
		setLoading(true)
		try {
			const { desc, imgUrl } = await openaiService.getBandData(name, description, year)
			setText(desc)
			setImageUrl(imgUrl)
			loadBand(name, description, year, desc, imgUrl)
		} catch (error) {
			console.error('Failed to get data:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='container'>
			<nav>
				<h1>Band Data Generator</h1>
			</nav>

			<form className='meta-form' onSubmit={handleSubmit}>
				<label htmlFor='name'>
					<span>Name:</span>
					<input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />
					{errors.name && <p className='error'>{errors.name}</p>}
				</label>

				<label htmlFor='description'>
					<span>{`Favorite band and why: (separated by a comma)`}</span>
					<textarea
						cols='30'
						rows='10'
						type='text'
						name='description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}></textarea>
					{errors.description && <p className='error'>{errors.description}</p>}
				</label>

				<label htmlFor='year'>
					<span>Year:</span>
					<DatePicker
						selected={year}
						onChange={(date) => setYear(date)}
						showYearPicker
						dateFormat='yyyy'
						calendarClassName='custom-calendar'
					/>
					{errors.year && <p className='error'>{errors.year}</p>}
				</label>

				{loading ? (
					<div className='spinner'></div>
				) : (
					<button className='submit-button' type='submit'>
						Lets get rolling
					</button>
				)}
			</form>

			{/* Statistics Section */}
			<div className='statistics'>
				<h2>Calculations</h2>
				<p>Count of Words That Start with a Capital Letter: {capitalWordsCount}</p>
				<p>Count of Words Followed by Numbers: {wordsFollowedByNumbersCount}</p>
				<p>Year Selected is {isYearEven ? 'Even' : 'Odd'}</p>
			</div>

			{/* Text Output */}
			<div className='description'>
				{text && imageUrl && (
					<div className='results'>
						<p>{text}</p>
						<div className='image'>
							<img src={imageUrl} alt='Generated Band Image' />
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default App
