import { Model } from 'sequelize';

interface UserAttributes {
    userId: string;
    password: string;
    email: string;
    nickname: string;
    expressionType: number;
    movementType: number;
    // other attributes...
}
export default (sequelize: any, DataTypes: any): any => {
    class User extends Model<UserAttributes> implements UserAttributes {
        userId: string;
        password: string;
        email: string;
        nickname: string;
        expressionType: number;
        movementType: number;
        // static associate(models: any) {}
    }
    User.init(
        {
            userId: {
                field: 'user_id',
                type: DataTypes.STRING(50),
                primaryKey: true,
                allowNull: false,
            },
            email: {
                field: 'email',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            nickname: {
                field: 'nickname',
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            password: {
                field: 'password',
                type: DataTypes.STRING(50),
            },
            expressionType: {
                field: 'expression_type',
                type: DataTypes.INTEGER,
            },
            movementType: {
                field: 'movement_type',
                type: DataTypes.INTEGER,
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            tableName: 'user',
            sequelize,
        },
    );
    return User;
};
