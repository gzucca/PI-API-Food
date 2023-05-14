const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
      set(value) {
        if (typeof value === "string") {
          this.setDataValue("healthScore", null);
        }
      },
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdRecipe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
