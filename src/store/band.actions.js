import { store } from './store'
import { SET_BAND } from './band.reducer'
import { utilService } from '../services/util.service'

// Load band data
export async function loadBand(name, description, year, desc, imgUrl) {
	try {
		const bandData = { name, description, year, desc, imgUrl }
		utilService.saveToStorage('band', [bandData])
		store.dispatch({ type: SET_BAND, bandData })
	} catch (err) {
		console.error('Error loading band data:', err)
		throw err
	}
}

// Fetch band data from storage
export async function fetchBand() {
	try {
		const bandData = utilService.loadFromStorage('band')
		if (bandData && bandData.length > 0) {
			store.dispatch({ type: SET_BAND, bandData: bandData[0] })
		}
	} catch (err) {
		console.error('Error fetching band data:', err)
		throw err
	}
}
