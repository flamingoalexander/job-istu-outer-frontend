import type { JSONSchemaType } from 'ajv';
import type { LoginResponse } from 'src/api/requests';
import { UserCompany, UserInfo } from 'src/types/index';


export const LoginResponseSchema: JSONSchemaType<LoginResponse> = {
  type: "object",
  properties: {
    rememberMe: { type: "boolean" },
    access: { type: "string", minLength: 1 },
  },
  required: ["rememberMe", "access"],
  additionalProperties: false,
}


export const UserInfoResponseSchema: JSONSchemaType<UserInfo> = {
  type: "object",
  properties: {
    username: { type: "string" },
    first_name: { type: "string" },
    last_name: { type: "string" },
    email: { type: "string" }
  },
  required: ["username", "first_name", "last_name", "email"],
  additionalProperties: false,
}
export const UserCompanyResponseSchema: JSONSchemaType<UserCompany> = {
  type: "object",
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    argeement_date_begin: { type: "string" },
    agreement_date_end: { type: "string"},
    agreement: { type: "string" },
    image_url: { type: "string" },
    area_of_activity: { type: "string" },
    head_full_name: { type: "string" },
    head_job_title: { type: "string" },
    hire_count: { type: "number" }
  },
  required: [
    "id",
    "name",
    "argeement_date_begin",
    "agreement_date_end",
    "agreement",
    "image_url",
    "area_of_activity",
    "head_full_name",
    "head_job_title",
    "hire_count"
  ],
  additionalProperties: false,
};
