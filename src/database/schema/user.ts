import mongoose, { Schema, model, Model } from 'mongoose'

export interface IUser {
    email: string
    password: string
    name: string
    isActive: boolean
    created: Date
    updated: Date
}

const userSchema = new Schema(
    {
        email: { type: String, require: true },
        password: { type: String, require: true },
        name: { type: String },
        isActive: { type: Boolean },
        created: { type: Date },
        updated: { type: Date },
    },
    { versionKey: false, collation: { locale: 'es' } }
)

const User: Model<IUser> = mongoose.models.User || model('User', userSchema)

export default User
