import { Types } from "mongoose";
import { hashedKeyMapper } from "./hasedKey";
import { createHash } from "./crypto/hmac-sha-256";

let MATCH_INDEX: number;

/**
 * Create Mongodb Pipeline
 * @param param0 | Projection, filter, search sorts, perPage, pageNumber
 * @returns {Array} pipeline | pipeline consists of mongodb for aggregation
 */

//  Do with Interface and improve the code
export const mongoPipeline = (
  { projection = {}, filters = [], sort = [], perPage = undefined, pageNumber = undefined },
  pagination: Boolean = true
): Array<any> => {
  const pipeline: any = [];

  // Filter Pipeline
  if (filters && filters.length) {
    filtersPipeline(pipeline, filters);
  }
  filterCheck(pipeline);

  // Sort pipeline
  if (sort && sort.length > 0) {
    sortPipeline(pipeline, sort);
  }

  // Projection pipeline
  if (Object.keys(projection).length > 0) {
    pipeline.push({ $project: projection });
  }

  // Pagination Pipeline
  if (pagination && (perPage || pageNumber)) {
    paginationPipeline(pipeline, pageNumber, perPage);
  }

  // Pipeline
  return pipeline;
};

/**
 * Pagination On the data
 * @param pipeline Array which consists of entire pipeline of mongodb
 * @param inputPageNumber Client side input of page number
 * @param inputPerPage Client side input of per-page number
 */
const paginationPipeline = (pipeline: any[], inputPageNumber: any, inputPerPage: any) => {
  const skip = (inputPageNumber - 1) * inputPerPage;
  const limit = inputPerPage;

  pipeline.push({ $skip: skip });

  pipeline.push({ $limit: limit });
};

/**
 * Sorting Pipeline
 * @param pipeline Array which consists of entire pipeline of mongodb
 * @param sort Array of object in which key and order present
 */
const sortPipeline = (pipeline: any[], sort: any[]) => {
  const sortPipe: any = {};

  for (const data of sort) {
    if (data.order === -1) {
      sortPipe[data.key] = -1;
    } else {
      sortPipe[data.key] = 1;
    }
  }

  pipeline.push({ $sort: sortPipe });
};

/**
 * Create filter pipeline for different range
 * @param pipeline Array which consists of entire pipeline of mongodb
 * @param filters Filters is object of array which is having key, value, upperValue, lowerValue, type, operation
 * @return pipeline Which will consists of filter query
 */
const filtersPipeline = (pipeline: any, filters: any) => {
  let filterQuery: any;
  let type;
  let key;
  let value: any;
  let upperValue;
  let lowerValue;
  let operation;
  let isArray;

  /* -1 is used to save index of pipeline array */
  MATCH_INDEX = pipeline.push({ $match: { $and: [{ $or: [] }, { $and: [] }] } }) - 1;

  for (const filter of filters) {
    filterQuery = {};
    type = filter.type;
    key = filter.key;
    value = filter.value;
    upperValue = filter.upperValue;
    lowerValue = filter.lowerValue;
    operation = filter.operation;
    isArray = false;

    switch (type) {
      case "date":
        // ?: If wrong format comes then it will break the code.
        if (lowerValue) {
          filterQuery[key] = { $gte: new Date(lowerValue) };
        }
        if (upperValue) {
          filterQuery[key] = { ...filterQuery[key], ...{ $lte: new Date(upperValue) } };
        }
        break;

      case "id":
        if (Array.isArray(value)) {
          isArray = true;
          for (const valueData in value) {
            value[valueData] = Types.ObjectId(value[valueData]);
          }

          // Get Array filter query
          filterQuery = arrayFilterQuery(value, key);
        } else {
          value = Types.ObjectId(value);
          filterQuery[key] = { $eq: Types.ObjectId(value) };
        }
        break;

      // Default is consider as type string, boolean
      case "hash":
        const keys: any[] = [...key.split(".")];
        const hasHPairKey = keys.pop();
        const hashedKey: string = hashedKeyMapper(hasHPairKey);
        const joinedKeys = keys.length > 0 ? `${keys.join("")}.${hashedKey}` : hashedKey;

        if (Array.isArray(value)) {
          const values = [...value];
          isArray = true;
          for (const valueData in values) {
            values[valueData] = createHash(values[valueData]);
          }

          // Get Array filter query
          filterQuery = arrayFilterQuery(values, joinedKeys);
        } else {
          value = createHash(value);
          filterQuery[joinedKeys] = { $eq: value };
        }
        // console.log(filterQuery)
        break;

      // Custom works only for object not for array
      case "custom":
        filterQuery[key] = value;
        break;

      // Default is consider as type string, boolean
      default:
        if (Array.isArray(value)) {
          isArray = true;
          filterQuery = arrayFilterQuery(value, key);
        } else {
          filterQuery[key] = { $eq: value };
        }
    }

    // Default Operation is AND
    filterQuery = isArray ? { $or: filterQuery } : filterQuery;
    if (operation && operation === "$or") {
      pipeline[MATCH_INDEX]["$match"]["$and"][0]["$or"].push(filterQuery);
    } else {
      pipeline[MATCH_INDEX]["$match"]["$and"][1]["$and"].push(filterQuery);
    }
  }
};

/**
 * Remove other unnecessary query in pipeline
 * @param pipeline Array which consists of entire pipeline of mongodb
 */
const filterCheck = (pipeline: any[]) => {
  /* Pop is used to remove last element from an array */
  if (pipeline[MATCH_INDEX] && pipeline[MATCH_INDEX]["$match"]["$and"][1]["$and"].length === 0) {
    pipeline[MATCH_INDEX]["$match"]["$and"].pop();
  }

  /* Shift is used to remove first element from an array */
  if (pipeline[MATCH_INDEX] && pipeline[MATCH_INDEX]["$match"]["$and"][0]["$or"].length === 0) {
    pipeline[MATCH_INDEX]["$match"]["$and"].shift();
  }

  /* Splice is used to remove filters form pipeline if its empty */
  if (pipeline[MATCH_INDEX] && pipeline[MATCH_INDEX]["$match"]["$and"].length === 0) {
    pipeline.splice(MATCH_INDEX, 1);
  }
};

/**
 * Generate query for array value
 * @param {Array} values | This is an array which consists of array of values
 * @param {String} key | This key for object index
 * @returns {Array} filterQueries | Filter queries which return the array of object
 */
const arrayFilterQuery = (values: any[], key: any): Array<any> => {
  const filterQueries: any = [];
  let index = 0;

  for (const value of values) {
    filterQueries[index] = {};
    filterQueries[index][key] = value;
    index++;
  }

  return filterQueries;
};
