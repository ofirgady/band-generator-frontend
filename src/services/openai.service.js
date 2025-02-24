import Axios from 'axios'

const axios = Axios.create({
	withCredentials: true,
})

const BASE_URL = process.env.NODE_ENV !== 'development' ? '/openai' : '//localhost:3030/openai'

export const openaiService = {
	getBandData,
}

// Get Band Data based on Name, Description, and Year
async function getBandData(name, description, year) {
	if (!name || !description || !year) {
		throw new Error('Missing required fields')
	}

	try {
		// First call (Meta)
		const metaRes = await axios.post(`${BASE_URL}/meta`, { name, description, year })
		const textData = metaRes.data

		// Second call (Image)
		const imageRes = await axios.post(`${BASE_URL}/image`, { name, description, year })
		const imageData = imageRes.data

		// Extract what you need for the UI
		const desc = textData.text
		const imgUrl = imageData.imageUrl

		return { desc, imgUrl }
	} catch (error) {
		console.error('Error in getBandData:', error)
		throw error
	}
}
