import { AutoIncrement, Column, CreatedAt, HasMany, DataType, Model, PrimaryKey, Table, Default, UpdatedAt } from 'sequelize-typescript';
import { UserFavourities } from './userFavourities';

@Table({
    tableName: 'user',
    timestamps: true
})

export class User extends Model<User> {

    @PrimaryKey
    @Column(DataType.STRING(128))
    user_id: string

    @Column(DataType.STRING(64))
    email: string

    @Column(DataType.STRING(128))
    password: string

    @Column(DataType.STRING(16))
    role: string

    @Default(1)
    @Column(DataType.BOOLEAN)
    status: boolean

    @CreatedAt
    @Column(DataType.DATE)
    created_at: Date

    @UpdatedAt
    @Column(DataType.DATE)
    modified_at: Date

    @HasMany(() => UserFavourities, { foreignKey: 'user_id', sourceKey: 'user_id', constraints: false })
    UserFavourities: UserFavourities;
}
