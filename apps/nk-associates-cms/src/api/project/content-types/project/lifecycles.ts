const { ApplicationError } = require("@strapi/utils").errors;

export default {
  beforeCreate(event) {
    const { totalUnits, unitsSold } = event.params.data;

    if (unitsSold > totalUnits) {
      throw new ApplicationError(
        "Sold Units cannot be higher than total Units ",
      );
    }
  },

  beforeUpdate(event) {
    const { totalUnits, unitsSold } = event.params.data;

    if (unitsSold > totalUnits) {
      throw new ApplicationError(
        "Sold Units cannot be higher than total Units ",
      );
    }
  },
};
