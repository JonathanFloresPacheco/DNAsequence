module.exports = (sequelize, DataTypes) => {
    return sequelize.define('dnasequence', {
        id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          field: 'id',
        },
        mutation:{
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: '0',
            field: 'mutation',
        },
        sequence: {
            type: DataTypes.STRING(2000),
            allowNull: false,
            field: 'sequence',
        },
        created_at: {
          type: 'TIMESTAMP',
          field: 'created_at',
        },
        updated_at: {
          type: 'TIMESTAMP',
          allowNull: true,
          field: 'updated_at',
        },
        deleted_at: {
          type: 'TIMESTAMP',
          allowNull: true,
          field: 'deleted_at',
        },
      }, {
        tableName: 'dnasequence',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: true,
        underscored: true,
      });
};