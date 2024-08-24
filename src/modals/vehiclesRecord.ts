import {Realm} from '@realm/react'

class VehiclesRecord extends Realm.Object<VehiclesRecord> {
	_id!: Realm.BSON.ObjectId;

	vehicleName!: string;

	brandName!: string;

	vehicleType!: string;

	createdAt?: Date;

	updatedAt?: Date;

	static schema: Realm.ObjectSchema = {
		name: 'VehiclesRecord',
		properties: {
			_id: 'objectId',
			vehicleName: 'string',
			brandName: 'string',
			vehicleType: 'string',
			createdAt: 'date',
			updatedAt: 'date?',
		},
		primaryKey: '_id',
	};
}

export default VehiclesRecord;