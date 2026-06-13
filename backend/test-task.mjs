import { Task } from "./dist/db/models/tasks.model.js";
import { toObjectId } from "./dist/lib/objectIdConverter.js";
import mongoose from "mongoose";

async function test() {
    try {
        const task = await Task.create({
            title: "test-debug",
            skillId: toObjectId("6a240fa4e70d950e261becdf"),
            ticketId: toObjectId("6a2d4cc5b2163f8cfad01b73"),
        });
        console.log("TASK CREATED:", task._id);
    } catch(e) {
        console.log("ERROR:", e.message);
        console.log("STACK:", e.stack);
    }
}

test().then(() => process.exit(0));
