import { BadRequestError } from "../error";

export const validateSchema = (schema, obj) => {
  const { error } = schema.validate(obj);
  if (error?.details[0]?.message) {
    throw new BadRequestError(error.details[0].message);
  }
};
