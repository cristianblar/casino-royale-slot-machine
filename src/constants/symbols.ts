import { Symbol } from '../models'

const cloudinaryRoot = 'https://res.cloudinary.com/cristianblar/image/upload'

export const symbols: Symbol[] = [
  {
    id: 1,
    name: 'cherry',
    score: 10,
    url: `${cloudinaryRoot}/v1643592977/SlotsMachine/CherrySVG_qpwabw.svg`
  },
  {
    id: 2,
    name: 'lemon',
    score: 20,
    url: `${cloudinaryRoot}/v1643593027/SlotsMachine/LemonSVG_s87nvf.svg`
  },
  {
    id: 3,
    name: 'orange',
    score: 30,
    url: `${cloudinaryRoot}/v1643593072/SlotsMachine/OrangeSVG_bb6wff.svg`
  },
  {
    id: 4,
    name: 'watermelon',
    score: 40,
    url: `${cloudinaryRoot}/v1643593099/SlotsMachine/WatermelonSVG_dukep1.svg`
  }
]
