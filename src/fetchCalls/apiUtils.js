const BASE_URL = process.env.NODE_ENV === 'production' ? '/api' : '//localhost:3030/api'

export const serverFetchAPI = (route, method, body) =>
	new Promise((resolve, reject) => {
		fetch(BASE_URL + '/' + route, {
			method: method,
			body: body,
			headers: new Headers({
				'Content-Type': 'application/json',
				Accept: 'application/json',
			}),
		})
			.then(res => {
				if (!res.ok) reject('error')
				resolve(res.json())
			})
			.catch(err => reject(err))
	})
