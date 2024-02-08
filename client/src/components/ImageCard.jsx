import React from 'react';
import PropTypes from 'prop-types';

const ImageCard = ({ src, alt, width, height, isSelected, onClick }) => {
	return (
		<img
			src={src}
			alt={alt}
			style={{ width, height }} // Apply width and height as inline styles
			className='object-contain'
			// This will cover the area of the div without stretching
		/>
	);
};

ImageCard.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	isSelected: PropTypes.bool,
	onClick: PropTypes.func,
};

ImageCard.defaultProps = {
	alt: '',
	width: 'auto',
	height: 'auto',
	isSelected: false,
	onClick: () => {},
};

export default ImageCard;
