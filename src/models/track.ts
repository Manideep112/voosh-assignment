import { Album } from './album';
import { Column, CreatedAt, DataType, Model, PrimaryKey, Table, Default, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Artist } from './artist';

@Table({
    tableName: 'track',
    timestamps: true
})

export class Track extends Model<Track> {

    @PrimaryKey
    @Column(DataType.STRING(128))
    track_id: string

    @ForeignKey(() => Artist)
    @Column(DataType.STRING)
    artist_id: string
    
    @ForeignKey(() => Album)
    @Column(DataType.STRING)
    album_id: string
    
    @Column(DataType.STRING(128))
    name: string

    @Column(DataType.INTEGER)
    duration: number

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

    @BelongsTo(() => Album, { foreignKey: 'album_id', targetKey: 'album_id' })
    Album: Album;

    @BelongsTo(() => Artist, { foreignKey: 'artist_id', targetKey: 'artist_id' })
    Artist: Artist;
}