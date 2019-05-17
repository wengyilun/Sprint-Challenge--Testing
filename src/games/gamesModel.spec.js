const db = require('../../data/dbConfig')
const Game = require('./gamesModel')


describe('games model', () => {
	beforeAll(async () => {
		await db('game').truncate()
	})
	
	beforeEach(async () => {
		await db('game').truncate()
	})
	
	describe('insert()', () => {
		it('should insert a game item', async () => {
			await Game.insert(
			{title:'game1',
					genre:'Horro'}
			)

			const games = await Game.getAll()
			expect(games).toHaveLength(1)
		})
	})
})
