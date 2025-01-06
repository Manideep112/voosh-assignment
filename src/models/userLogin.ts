import { AutoIncrement, Column, CreatedAt, HasMany, DataType, Model, PrimaryKey, Table, Default, UpdatedAt } from 'sequelize-typescript';

@Table({
    tableName: 'user_login',
    timestamps: true
})

export class UserLogin extends Model<UserLogin> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: string
    
    @Column(DataType.STRING(128))
    user_id: string

    @Column(DataType.TEXT)
    token: string

    @Default(1)
    @Column(DataType.INTEGER)
    status: boolean

    @CreatedAt
    @Column(DataType.DATE)
    created_at: Date

    @UpdatedAt
    @Column(DataType.DATE)
    modified_at: Date
}
