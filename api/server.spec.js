const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

describe('server', () => {
	beforeAll(async () => {
		await db('game').truncate()
	})

	beforeEach(async () => {
		await db('game').truncate()
	})
	// open client, make a request and inspect the response
	describe('GET /',  () => {
		it('should return 200 OK',() => {
			return  request(server)
					.get('/')
					.expect(200)
		});
		
		it('should return 200 OK ', async() => {
			const result = await request(server).get('/')
			expect(result.status).toBe(200)
		});
		
		it('should return 200 OK - using use the squad( async/await) ', async() => {
			const result = await request(server).get('/')
			expect(result.type).toBe('application/json')
		});
		
		
		it('should return JSON - using done callback', done => {
			return request(server).get('/').then(res  => {
				expect(res.type).toBe('application/json')
				done()
			})
		});
		
		
		it('should return { api: "up" }', done => {
			return request(server).get('/').then(res  => {
				expect(res.body.api).toBe("up")
				done()
			})
		});
	});
});


describe('games', () => {
	describe('GET /api/games',  () => {
		it('should return 200 OK ', async() => {
			const result = await request(server).get('/games')
			expect(result.status).toBe(200)
		});
		
		it('should always reuturn an array', async() => {
			const result = await request(server).get('/games')
			expect( Array.isArray(result.body)).toBe(true)
		});
	})
	
	describe('POST /api/games',  () => {
		it('should return an 201 status code if the insert is successful', async () => {
			const expectedStatusCode = 201;
			const response = await request(server)
				.post('/games')
				.send({title:'game1',genre:'Horror'})
			
			expect(response.status).toEqual(expectedStatusCode);
		})
		
		
		it('should receive the correct game data on success', async () => {
			const response = await request(server)
			.post('/games')
			.send({title:'game1',genre:'Horror'})
			// console.log(response.body)
			 expect(typeof(response.body)).toBe('object');
		})
		
		it('should return an 422 status code if the required field is missing', async () => {
				const expecstedStatusCode = 422;
				const response = await request(server)
				.post('/games')
				.send({title:'game1'})

			expect(response.status).toEqual(expecstedStatusCode);

		})
	});
});
