import { Model } from 'sequelize';

interface ExpressionAttributes {
    expressionId: number;
    userId: string;
    expression: string;
    accuracy: number;
    time: number;
    videoUrl: string;
    // other attributes...
}
export default (sequelize: any, DataTypes: any) => {
    class Expression extends Model<ExpressionAttributes> implements ExpressionAttributes {
        expressionId!: number;
        userId!: string;
        expression!: string;
        accuracy!: number;
        time!: number;
        videoUrl!: string;
        // static associate(models: any) {}
    }
    Expression.init(
        {
            expressionId: {
                field: 'expression_id',
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            userId: {
                field: 'user_id',
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            expression: {
                field: 'expression',
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            accuracy: {
                field: 'accuracy',
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            time: {
                field: 'time',
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            videoUrl: {
                field: 'video_url',
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
            tableName: 'expression',
            sequelize,
        },
    );
    return Expression;
};
