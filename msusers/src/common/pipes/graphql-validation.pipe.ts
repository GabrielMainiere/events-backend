import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Type,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

@Injectable()
export class GraphQLValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
    if (!metatype || !this.needsValidation(metatype)) {
      return value
    }

    const object = plainToClass(metatype, value)
    const errors = await validate(object, {
      transform: true,
    })

    if (errors.length > 0) {
      const message = `Validation Error: ${errors.flatMap(err => Object.values(err.constraints || {})).join(', ')}`
      throw new BadRequestException({
        message,
      })
    }

    return object
  }

  private needsValidation(metatype: Type<unknown>): boolean {
    const types: Type<unknown>[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
