const utils = require('../src/utils')
const { gameService } = require('../src/services')
const { symbols } = require('../src/constants')

describe('getRandomInteger util', () => {
  test('should return a random integer between 1 (inclusive) and 11 (exclusive)', () => {
    for (let i = 0; i < 10; i++) {
      expect(utils.getRandomInteger(1, 11)).toBeGreaterThan(0)
      expect(utils.getRandomInteger(1, 11)).toBeLessThan(11)
    }
  })
})

describe('GameService - Business logic', () => {
  describe('shuffle method', () => {
    test('should return an array with 3 symbols', () => {
      expect(gameService.shuffle()).toHaveLength(3)
    })
  })

  describe('decideNewShuffle method', () => {
    test('should return error if probability is less than 0 or greater than 1', () => {
      expect(() => gameService.decideNewShuffle(2)).toThrow()
      expect(() => gameService.decideNewShuffle(-1)).toThrow()
    })
    test('should return a boolean according to probability (always false for probability 0)', () => {
      const results = []
      for (let i = 0; i < 10; i++) {
        results.push(gameService.decideNewShuffle(0))
      }
      expect(results.every(result => result === false)).toBeTruthy()
    })
    test('should return a boolean according to probability (always true for probability 1)', () => {
      const results = []
      for (let i = 0; i < 10; i++) {
        results.push(gameService.decideNewShuffle(1))
      }
      expect(results.every(result => result === true)).toBeTruthy()
    })
    test('should return a boolean according to probability (random for probability 0.5)', () => {
      const results = []
      for (let i = 0; i < 50; i++) {
        results.push(gameService.decideNewShuffle(0.5))
      }
      expect(results.every(result => result === true)).toBeFalsy()
    })
  })

  describe('isWinnerShuffle method', () => {
    test('should return true if the shuffle is winner', () => {
      expect(
        gameService.isWinnerShuffle([symbols[0], symbols[0], symbols[0]])
      ).toBeTruthy()
    })
    test('should return false if the shuffle is loser', () => {
      expect(
        gameService.isWinnerShuffle([symbols[0], symbols[1], symbols[2]])
      ).toBeFalsy()
    })
  })

  describe('play method', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    test('should throw error if credits are less than 0', () => {
      expect(() => gameService.play(-1)).toThrow()
    })

    test('should return the first shuffle directly if it is not a winner shuffle', () => {
      const shuffleSpy = jest
        .spyOn(gameService, 'shuffle')
        .mockReturnValue([symbols[0], symbols[1], symbols[2]])
      const isWinnerShuffleSpy = jest.spyOn(gameService, 'isWinnerShuffle')
      const decideNewShuffleSpy = jest.spyOn(gameService, 'decideNewShuffle')
      gameService.play()
      expect(shuffleSpy).toHaveBeenCalledTimes(1)
      expect(isWinnerShuffleSpy).toHaveBeenCalledTimes(1)
      expect(decideNewShuffleSpy).not.toHaveBeenCalled()
    })

    test('should decide a new shuffle if the first is a winner shuffle', () => {
      const shuffleSpy = jest
        .spyOn(gameService, 'shuffle')
        .mockReturnValue([symbols[0], symbols[0], symbols[0]])
      const isWinnerShuffleSpy = jest.spyOn(gameService, 'isWinnerShuffle')
      const decideNewShuffleSpy = jest.spyOn(gameService, 'decideNewShuffle')
      gameService.play()
      expect(shuffleSpy).toHaveBeenCalledTimes(1)
      expect(isWinnerShuffleSpy).toHaveBeenCalledTimes(1)
      expect(decideNewShuffleSpy).toHaveBeenCalledTimes(1)
    })

    test('should return the first shuffle if the decision is false', () => {
      const shuffleSpy = jest
        .spyOn(gameService, 'shuffle')
        .mockReturnValue([symbols[0], symbols[0], symbols[0]])
      const isWinnerShuffleSpy = jest.spyOn(gameService, 'isWinnerShuffle')
      const decideNewShuffleSpy = jest
        .spyOn(gameService, 'decideNewShuffle')
        .mockReturnValue(false)
      gameService.play()
      expect(shuffleSpy).toHaveBeenCalledTimes(1)
      expect(isWinnerShuffleSpy).toHaveBeenCalledTimes(1)
      expect(decideNewShuffleSpy).toHaveBeenCalledTimes(1)
    })

    test('should generate a new shuffle if the decision is true', () => {
      const shuffleSpy = jest
        .spyOn(gameService, 'shuffle')
        .mockReturnValue([symbols[0], symbols[0], symbols[0]])
      const isWinnerShuffleSpy = jest.spyOn(gameService, 'isWinnerShuffle')
      const decideNewShuffleSpy = jest
        .spyOn(gameService, 'decideNewShuffle')
        .mockReturnValue(true)
      gameService.play()
      expect(shuffleSpy).toHaveBeenCalledTimes(2)
      expect(isWinnerShuffleSpy).toHaveBeenCalledTimes(2)
      expect(decideNewShuffleSpy).toHaveBeenCalledTimes(1)
    })
  })
})
