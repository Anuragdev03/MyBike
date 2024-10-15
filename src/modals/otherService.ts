import {Realm} from '@realm/react'

class OtherService extends Realm.Object<OtherService> {
	_id!: Realm.BSON.ObjectId;

    vehicleId!: string;

    productDetail!: string;

	cost!: string;

    otherDetails?: string;

	createdAt?: Date;

	updatedAt?: Date;

	static schema: Realm.ObjectSchema = {
		name: 'OtherService',
		properties: {
			_id: 'objectId',
			vehicleId: 'string',
            cost: "string",
            otherDetails: "string",
            productDetail: "string",
			createdAt: 'date',
			updatedAt: 'date?',
		},
		primaryKey: '_id',
	};
}

export default OtherService;