import {createRealmContext} from '@realm/react';
import VehiclesRecord from './vehiclesRecord';
import ServiceData from './serviceData';
import TotalCost from './cost';
import OtherService from './otherService';

export const VehiclesRecordRealmContext = createRealmContext({
    schema: [VehiclesRecord, ServiceData, TotalCost, OtherService]
})