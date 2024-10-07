import {createRealmContext} from '@realm/react';
import VehiclesRecord from './vehiclesRecord';
import ServiceData from './serviceData';
import TotalCost from './cost';

export const VehiclesRecordRealmContext = createRealmContext({
    schema: [VehiclesRecord, ServiceData, TotalCost]
})