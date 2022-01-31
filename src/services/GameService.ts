import { getRandomInteger } from '../utils'
import { Symbol, Threshold } from '../models'

export class GameService {
  constructor(
    private symbols: Symbol[],
    private thresholds: Threshold[],
    private slotsAmount: number
  ) {}

  private shuffle(): Symbol[] {
    const shuffleResult = []
    while (shuffleResult.length < this.slotsAmount) {
      const randomSymbol = this.symbols.find(
        symbol => getRandomInteger(1, this.symbols.length + 1) === symbol.id
      )
      if (randomSymbol) shuffleResult.push(randomSymbol)
    }
    return shuffleResult
  }

  private decideNewShuffle(probability: number): boolean {
    if (probability < 0 || probability > 1)
      throw new RangeError('Probability must be a float number between 0 and 1')

    const fixedProbability = probability * 10
    const randomNumber = getRandomInteger(1, 11)

    return randomNumber <= fixedProbability
  }

  private isWinnerShuffle(shuffle: Symbol[]): boolean {
    return shuffle.every(symbol => symbol.id === shuffle[0].id)
  }

  public play(credits: number): { result: Symbol[]; isWinner: boolean } {
    if (credits < 0)
      throw new RangeError('Credits must be greater than or equal to zero')

    const currentThreshold: Threshold = this.thresholds.find(threshold =>
      !threshold.creditsCeil
        ? credits >= threshold.creditsFloor
        : credits >= threshold.creditsFloor && credits < threshold.creditsCeil
    ) || { creditsFloor: 0, probability: 0 }

    const firstShuffle = this.shuffle()

    if (!this.isWinnerShuffle(firstShuffle))
      return { result: firstShuffle, isWinner: false }

    if (!this.decideNewShuffle(currentThreshold.probability))
      return { result: firstShuffle, isWinner: true }

    const newShuffle = this.shuffle()
    return { result: newShuffle, isWinner: this.isWinnerShuffle(newShuffle) }
  }
}
