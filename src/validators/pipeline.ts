import { Joi } from "celebrate";
import { CONSTANTS } from "@configs";

export const pipeline = Joi.object().keys({
  // Filters
  filters: Joi.array()
    .items({
      key: Joi.string().required(),
      type: Joi.string(),
      value: [Joi.string().trim().allow(null), Joi.array(), Joi.boolean()],
      upperValue: [Joi.number(), Joi.string().isoDate().allow(null)],
      lowerValue: [Joi.number(), Joi.string().isoDate().allow(null)],
      operation: Joi.string()
    })
    .default([]),

  // Sort
  sort: Joi.array()
    .items({
      key: Joi.string().required(),
      order: Joi.number().required()
    })
    .default([]),

  // Pagination
  perPage: Joi.number().min(1).default(CONSTANTS.PAGINATION.PER_PAGE),
  pageNumber: Joi.number().min(1).default(1)
});
