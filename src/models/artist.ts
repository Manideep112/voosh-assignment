import { Album } from './album';
import { Column, PrimaryKey, AutoIncrement, CreatedAt, DataType, HasMany, Model, Table, Default, UpdatedAt } from 'sequelize-typescript';
import { Track } from './track';
@Table({
    tableName: 'artist',
    timestamps: true
})

export class Artist extends Model<Artist>{
    
    @PrimaryKey
    @Column(DataType.STRING(128))
    artist_id: string

    @Column(DataType.STRING(128))
    name: string

    @Column(DataType.STRING(128))
    grammy : string

    @Default(0)
    @Column(DataType.BOOLEAN)
    hidden : Boolean
     
    @Default(1)
    @Column(DataType.BOOLEAN)
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

    @HasMany(() => Album, { foreignKey: 'artist_id', sourceKey: 'artist_id', constraints: false})
    Album: Album;

    @HasMany(() => Track, { foreignKey: 'artist_id', sourceKey: 'artist_id', constraints: false})
    Track: Track;
}