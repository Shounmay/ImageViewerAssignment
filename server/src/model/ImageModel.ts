import mongoose, { Schema } from 'mongoose';

// User Config

interface iBlog {
	imageUrl: string;
}
const ImageSchema = new mongoose.Schema(
	{
		imageUrl: { type: String },
	},
	{ timestamps: true }
);

export const ImageModel = mongoose.model<iBlog>('ImageModel', ImageSchema);
