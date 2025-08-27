import type { JSONSchemaType } from 'ajv';
import Ajv from 'ajv';

export const validateObjSchema = <T>(obj: object, schema:JSONSchemaType<T>): boolean => {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  return Boolean(validate(obj));
}


