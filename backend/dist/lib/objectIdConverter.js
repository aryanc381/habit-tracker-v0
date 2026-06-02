import mongoose from "mongoose";
export function toObjectId(id) {
    return new mongoose.Types.ObjectId(id);
}
//# sourceMappingURL=objectIdConverter.js.map