import { type BaseSchema } from '../common/dto/base.dto'

export interface IUrl extends BaseSchema {
    originalUrl: string
    expiresAt: Date
}
