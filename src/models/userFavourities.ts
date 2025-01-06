import { Column, PrimaryKey, BelongsTo, CreatedAt, DataType,  HasMany, Model, Table, Default, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { User } from './user';

@Table({
    tableName: 'user_favourities',
    timestamps: true
})

export class UserFavourities extends Model<UserFavourities>{
    
    @PrimaryKey
    @Column(DataType.STRING(128))
    favourite_id: string

    @ForeignKey(() => User)
    @Column(DataType.STRING(128))
    user_id: string

    @Column(DataType.STRING(128))
    category: string

    @Column(DataType.STRING(128))
    item_id : string

    @Column(DataType.STRING(128))
    name : string
  
    @Default(1)
    @Column(DataType.INTEGER)
    status: Boolean

    @CreatedAt
    @Column(DataType.DATE)
    created_at: Date

    @Column(DataType.STRING(128))
    created_by: string

    @UpdatedAt
    @Column(DataType.DATE)
    modified_at: Date

    @Column(DataType.STRING(128))
    modified_by: string

    @BelongsTo(() => User, { foreignKey: 'user_id', targetKey: 'user_id' })
    User: User;
}