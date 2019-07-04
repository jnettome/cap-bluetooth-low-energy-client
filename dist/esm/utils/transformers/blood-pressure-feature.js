import { toDataView } from "../utils";
export const BloodPressureFeatureCallback = (data) => {
    const view = toDataView(data);
    const flags = view.getUint16(0, true);
    return {
        bodyMovementDetectionSupport: !!(flags & 0x1),
        cuffFitDetectionSupported: !!(flags & 0x2),
        irregularPulseDetectionSupported: !!(flags & 0x4),
        pulseRateRangeDetectionSupported: !!(flags & 0x8),
        measurementPositionDetectionSupported: !!(flags & 0x10),
        multipleBondsSupported: !!(flags & 0x20)
    };
};
//# sourceMappingURL=blood-pressure-feature.js.map