/**
 * Get users necessary data from the data for specific work
 * @param includeFunctions function need to execute
 */
const build = (includeFunctions: any[]) => {
  let projection = {};

  if (includeFunctions) {
    if (includeFunctions.length > 0) {
      for (const fun of includeFunctions) {
        projection = {
          ...projection,
          ...mapFunction(fun)
        };
      }
    }
  }

  /* Final Security Resort to make sure projection is not {} */
  if (Object.keys(projection).length === 0) {
    projection = { ...basic() };
  }
  return projection;
};

/* Mapping projection function strings to projection function */
const mapFunction = (fun: any) => {
  switch (fun) {
    case "basic":
      return basic();
    case "minimal":
      return minimal();
    case "internal":
      return internal();
  }
};

/**
 * Basic projection can be used for
 * read-many case
 */
function basic() {
  return {
    userType: 1,
    email: 1,
    name: 1,
    subjects: 1
  };
}

/**
 * Minimal Can be used for
 * Read-many So more details option can be seen by the client
 */
function minimal() {
  return {
    createdAt: 1,
    updatedAt: 1
  };
}

/**
 * All Sensitive Data which can seen by the
 * admin
 * data owner
 */
function internal() {
  return {
    password: 1
  };
}

export { build as userProjection };
