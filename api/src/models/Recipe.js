const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: {
      type: DataTypes.UUID, //generamos un ID único con valores random que no se van a repetir. Esto para que no se pise con la API
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: false,
      // get() {
      //   const stepByStep = this.getDataValue(steps);
      //   return stepByStep.number + ": " + stepByStep.step
      // }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdRecipe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};
