import mongoose from "mongoose";

export class Database {
	public async connect(address: string) {
		await mongoose.connect(address, { maxPoolSize: 10, connectTimeoutMS: 3000 });
	}
}