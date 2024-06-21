import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsDateInRange(min: Date, max: Date, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDateInRange',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min, max],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!(value instanceof Date)) {
            value = new Date(value);
          }
          const [minDate, maxDate] = args.constraints;
          return value >= minDate && value <= maxDate;
        },
        defaultMessage(args: ValidationArguments) {
          const [minDate, maxDate] = args.constraints;
          return `Date of birth must be between ${minDate.toISOString().split('T')[0]} and ${maxDate.toISOString().split('T')[0]}`;
        },
      },
    });
  };
}
