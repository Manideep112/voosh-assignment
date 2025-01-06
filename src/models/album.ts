import { Artist } from './artist';
import { HasMany, Column, CreatedAt, DataType, Model, PrimaryKey, Table, Default, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Track } from './track';

@Table({
    tableName: 'album',
    timestamps: true
})

export class Album extends Model<Album> {

    @PrimaryKey
    @Column(DataType.STRING(128))
    album_id: string
    
    @ForeignKey(() => Artist)
    @Column(DataType.STRING)
    artist_id: string
    
    @Column(DataType.STRING(128))
    name: string

    @Column(DataType.INTEGER)
    year: number

    @Default(0)
    @Column(DataType.BOOLEAN)
    hidden: boolean

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

    @BelongsTo(() => Artist, { foreignKey: 'artist_id', targetKey: 'artist_id' })
    Artist: Artist;

    @HasMany(() => Track, { foreignKey: 'album_id', sourceKey: 'album_id', constraints: false})
    Track: Track;
}