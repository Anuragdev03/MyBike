import {Realm} from '@realm/react'


class TotalCost extends Realm.Object<TotalCost> {
    _id!: Realm.BSON.ObjectId;

    vehicleId!: string;

    totalCost!: string;

    createdAt?: Date;

	updatedAt?: Date;

    static schema: Realm.ObjectSchema = {
        name: "TotalCost",
        properties: {
            _id: "objectId",
            vehicleId: "string",
            totalCost: "string",
            createdAt: 'date',
			updatedAt: 'date?',
        },
        primaryKey: '_id',
    }
}

export default TotalCost;
