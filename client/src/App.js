import './index.css';

import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import api from './utils/api';
import toast, { Toaster } from 'react-hot-toast';

// Assume imageData is an array of objects with properties like `src` and `alt`
const PreviewModal = ({ src, onUpload, onDelete }) => {
	if (!src) return null; // Don't render the modal if there's no image source

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
			<div className='bg-white p-4 rounded-lg'>
				<img src={src} alt='Preview' className='max-h-40 max-w-xs' />
				<div className='flex justify-between mt-2'>
					<button onClick={onDelete} className='bg-red-500 text-white p-1'>
						Delete
					</button>
					<button onClick={onUpload} className='bg-blue-500 text-white p-1'>
						Upload
					</button>
				</div>
			</div>
		</div>
	);
};
function App() {
	const [imageData, setImageData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedImage, setSelectedImage] = useState({
		src: 'null',
	});
	const [imageUploaded, setImageUploaded] = useState(null);
	const uploadImageToService = async () => {
		try {
			console.log('Uploading image to service...', imageUploaded);
			const requestBody = { image: imageUploaded, type: 'jpg' };
			const { data } = await api.post('/api/upload-image', requestBody);
			console.log('After uploading: ', data);
			setShowModal(false);
			setImageData((prevList) => [...prevList, { src: data.Location }]);
			toast.success('Image Uploaded');
		} catch (error) {
			console.log('Error in uploading : ', error);
		}
	};
	const removeUploadedImage = () => {
		setImageUploaded(null);
		setShowModal(false);
	};

	useEffect(() => {
		async function fetchImages() {
			const { data } = await api.get('/api/get-images');
			console.log('image Data: ', data);
			setImageData(data);
			setSelectedImage(data[0]);
		}

		fetchImages();
	}, []);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				// Optionally, update state to show the image preview in the UI
				setImageUploaded(reader.result);
				setShowModal(true);
			};
			reader.readAsDataURL(file);
		}
	};
	return (
		<div className='flex flex-col bg-black min-h-screen max-h-screen overflow-hidden'>
			<Toaster />
			{/* First box with the triple border occupying 80% of the height */}
			<div className='flex-grow border relative border-white p-0.5'>
				<label
					htmlFor='imageUpload'
					className='absolute top-4 right-0 m-2 bg-pink-600 text-white p-2 cursor-pointer'
				>
					+ Add Image
				</label>
				<input
					id='imageUpload'
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					className='hidden'
				/>
				{showModal && (
					<PreviewModal
						src={imageUploaded}
						onUpload={uploadImageToService}
						onDelete={removeUploadedImage}
					/>
				)}
				<div className='border border-pink-600 p-1 h-full'>
					<div className='border border-white p-0.5 flex justify-center items-center h-full bg-black'>
						{/* Image container with adjusted height, making it responsive */}
						<div
							className='w-full sm:w-4/5 md:w-4/5 lg:w-3/5 xl:w-3/5 mb-4 sm:mb-6 md:mb-8 lg:mb-10 xl:mb-10'
							style={{ height: 'calc(80vh - 6px)' }} // Adjusted height calculation
						>
							<ImageCard
								src={selectedImage.src}
								alt={selectedImage.alt}
								width='100%'
								height='100%'
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Second box with thumbnails occupying the remaining space */}
			<div className='border border-white p-0.5 bg-gray-800'>
				<div className='border border-pink-600 p-1 h-full'>
					<div className='border border-white p-0.5 flex items-center gap-1 overflow-x-auto h-full'>
						{imageData.map((image, index) => (
							<div
								key={index}
								className={`inline-flex justify-center items-center p-1 ${
									selectedImage.src === image.src
										? 'border-2 border-red-500'
										: 'border-2 border-transparent'
								}`}
								onClick={() => setSelectedImage(image)}
							>
								<ImageCard
									src={image.src}
									alt={image.alt}
									width='80px' // Fixed width for thumbnails
									height='60px' // Fixed height for thumbnails
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
