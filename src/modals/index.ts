import {createRealmContext} from '@realm/react';
import VehiclesRecord from './vehiclesRecord';
import ServiceData from './serviceData';

export const VehiclesRecordRealmContext = createRealmContext({
    schema: [VehiclesRecord, ServiceData]
})