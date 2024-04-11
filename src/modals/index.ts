import {createRealmContext} from '@realm/react';
import VehiclesRecord from './vehiclesRecord';

export const VehiclesRecordRealmContext = createRealmContext({
    schema: [VehiclesRecord]
})