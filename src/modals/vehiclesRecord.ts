import {Realm} from '@realm/react'

class VehiclesRecord extends Realm.Object<VehiclesRecord> {
	_id!: Realm.BSON.ObjectId;

	vehicleName!: string;

	brandName!: string;

	vehicleType!: Date;

	createdAt!: Date;

	updatedAt?: Date;

	static generate(vehicleName: string, brandName: string, vehicleType: Date, createdAt?: Date) {
		return {
			_id: new Realm.BSON.ObjectId(),
			vehicleName,
			vehicleType,
			brandName,
			createdAt: createdAt || new Date(),
			updatedAt: new Date(),
		};
	}

	static schema: Realm.ObjectSchema = {
		name: 'VehiclesRecord',
		properties: {
			_id: 'objectId',
			vehicleName: 'string',
			brandName: 'string',
			vehicleType: 'date',
			createdAt: 'date',
			updatedAt: 'date?',
		},
		primaryKey: '_id',
	};
}

export default VehiclesRecord;