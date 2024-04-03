import {Realm} from '@realm/react'

export class VehiclesRecord extends Realm.Object {
    id!: Realm.BSON.ObjectId;;
    vehicleName!: string;
    avatar!: string;
    brandName!: string;
    type!: string;

    constructor(realm: Realm, id: string, vehicleName: string, avatar: string, brandName: string, type: string) {
        super(realm, id, vehicleName, avatar, brandName, type)
    }
}