import { S3, AWSError } from 'aws-sdk';
import { Request, Response } from 'express';
import { ImageModel } from '../model/ImageModel';

const config: S3.Types.ClientConfiguration = {
	accessKeyId: process.env.accessKeyId,
	secretAccessKey: process.env.secretAccessKey,
	region: process.env.region,
	apiVersion: process.env.apiVersion,
};
const AWSS3 = new S3(config);

export const uploadImageTest = async (req: Request, res: Response) => {
	try {
		// console.log(req.body);
		let { image, type } = req.body;

		const base64Image: Buffer = Buffer.from(
			image.replace(/^data:image\/\w+;base64,/, ''),
			'base64'
		);

		// image params
		const params = {
			Bucket: 'imageviewerassignment',
			Key: `${Date.now()}.${type}`,
			Body: base64Image,

			ContentEncoding: 'base64',
			ContentType: `image/${type}`,
		};

		AWSS3.upload(
			params,
			async (err: AWSError, data: S3.ManagedUpload.SendData) => {
				if (err) {
					console.log(err);
					res.sendStatus(400);
				} else {
					// console.log(data);
					const addImageToDb = await new ImageModel({
						imageUrl: data.Location,
					}).save();
					res.send(data);
				}
			}
		);
	} catch (err) {
		console.log(err);
		res.json({ error: 'Upload failed. Try again.' });
	}
};

export const getImagesController = async (req: Request, res: Response) => {
	try {
		const imageList = await ImageModel.find().select('imageUrl');
		const srcList = imageList.map((img) => {
			return {
				src: img.imageUrl,
				des: img._id,
			};
		});
		res.status(200).json(srcList);
	} catch (error) {
		console.log(error);
		res.json({ error: 'Cannot Fetch images' });
	}
};
