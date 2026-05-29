import mongoose from "mongoose";
import { User } from "../db/models/user.models.js";
import bcrypt from 'bcrypt';
import { env } from "../env.js";

interface signUpInput {
    email: string,
    password: string,
    fullName: string
}

interface loginInput {
    email: string,
    password: string
}

export async function signup(input: signUpInput) {
    // existing user present
    const existingUser = await User.findOne({email: input.email});
    if(existingUser) { return { status: 409, msg: `Existing user ${input.fullName} is already present in database.`} }

    // hashed password
    const hashedPassword = await bcrypt.hash(input.password, Number(env.BCRYPT_SALT));
    const newUser = await User.create({ email: input.email, password: hashedPassword, fullName: input.fullName });

    return { status: 200, msg: `User ${newUser.fullName} added in habit-tracker.` }
}

export async function login(input: loginInput) {
    const existingUser = await User.findOne({ email: input.email });
    if(!existingUser) { return { status: 409, msg: `User ${input.email} does not exist.` }}

    const hashedPassword = existingUser.password;
    const auth = await bcrypt.compare(input.password, hashedPassword);

    if(!auth) { return { status: 401, msg: `Invalid credentials for ${existingUser.email}`} }

    return { status: 200, msg: `Login successfull.`}
}