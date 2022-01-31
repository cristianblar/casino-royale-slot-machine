import { Threshold } from '../models'

export const thresholds: Threshold[] = [
  {
    creditsFloor: 0,
    creditsCeil: 40,
    probability: 0
  },
  {
    creditsFloor: 40,
    creditsCeil: 61,
    probability: 0.3
  },
  {
    creditsFloor: 61,
    probability: 0.6
  }
]
