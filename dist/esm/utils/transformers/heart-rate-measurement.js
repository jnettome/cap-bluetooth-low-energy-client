import { toDataView } from "../utils";
export const HeartRateMeasurementCallback = (data) => {
    const view = toDataView(data);
    const flags = view.getUint8(0);
    let index = 1;
    let measurement = {};
    const is16Bit = flags & 0x1;
    if (is16Bit) {
        const heartRate = view.getUint16(index, true);
        measurement = Object.assign({}, measurement, { heartRate });
        index += 2;
    }
    else {
        const heartRate = view.getUint8(index);
        measurement = Object.assign({}, measurement, { heartRate });
        index += 1;
    }
    const contactSensorPresent = flags & 0x4;
    if (contactSensorPresent) {
        const contactDetected = !!(flags & 0x2);
        measurement = Object.assign({}, measurement, { contactDetected });
    }
    const energyPresent = flags & 0x8;
    if (energyPresent) {
        const energyExpended = view.getUint16(index, true);
        measurement = Object.assign({}, measurement, { energyExpended });
        index += 2;
    }
    const rrIntervalPresent = flags & 0x10;
    if (rrIntervalPresent) {
        let rrIntervals = [];
        for (; index + 1 < view.byteLength; index += 2) {
            rrIntervals = [...rrIntervals, view.getUint16(index, true)];
        }
        measurement = Object.assign({}, measurement, { rrIntervals });
    }
    return measurement;
};
//# sourceMappingURL=heart-rate-measurement.js.map