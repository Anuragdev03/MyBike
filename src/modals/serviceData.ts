import {Realm} from '@realm/react'

class ServiceData extends Realm.Object<ServiceData> {
	_id!: Realm.BSON.ObjectId;

    vehicleId!: string;

	currentKm!: string;

	serviceStation!: string;

	serviceCost!: string;

    otherDetails?: string;

    serviceDate!: Date;

    nextService!: Date;

	createdAt?: Date;

	updatedAt?: Date;

	static schema: Realm.ObjectSchema = {
		name: 'ServiceData',
		properties: {
			_id: 'objectId',
			vehicleId: 'string',
			currentKm: 'string',
			serviceStation: 'string',
            serviceCost: "string",
            otherDetails: "string",
            serviceDate: "date",
            nextService: "date",
			createdAt: 'date',
			updatedAt: 'date?',
		},
		primaryKey: '_id',
	};
}

export default ServiceData;