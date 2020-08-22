import * as React from 'react';
import { Divider, Row, Col, Button, Modal } from 'antd';
import GraphImg from 'graphcms-image';
import { useQuery } from '@apollo/client';
import { Heading, HeadingLevel } from 'baseui/heading';
import Loading from '../Loading';
import { Gallery } from '../types/dynamic_content/Gallery';
import { GET_GALLERIES } from '../gql/dynamic_content/Gallery';

export default () => {
	const { loading, error, data } = useQuery(GET_GALLERIES);

	if (loading) return (<Loading />);
	if (error) return (<span>Error! {error.message}</span>);

	const galleries: Gallery[] = data.galleries;

	return (
		<React.Fragment>
			<HeadingLevel>
				{galleries.map(gallery => 
					<Row 
						key={`row-${gallery.title}`}
						justify="space-around" 
						align="middle" 
						gutter={[8, 8]}>
						<Heading>{gallery.title}</Heading>
						<Divider />
						{_renderImages(gallery.images)}
					</Row>
				)}
			</HeadingLevel>
		</React.Fragment>
	);
}

/* Return a Col for each image, containing a GraphImg thumbnail,
 * wrapped in a button that opens the image modal */
export function _renderImages(images) {
	return images.map(image => 
		<Col
			key={`col-${image.handle}`}>
			<Button 
				type='ghost'
				ghost
				onClick={() => _imageModal(image)}
				style={{
					width: '332px',
					height: '332px',
					padding: 0
				}}>
				{/* Render a clickable thumbnail image */}
				<GraphImg
					key={image.handle}
					// title="Sample"
					// alt="Sample"
					image={{
						handle: image.handle,
						width: 330,
						height: 330
					}}
					maxWidth={500}
					withWebp
					style={{
						width: 330,
						height: 330
					}}
				/>	
			</Button>
		</Col>
	);
}

/* Open a Modal with the full-size image inside */
export function _imageModal(image) {
	Modal.info({
		icon: <></>,
		className: 'image-modal',
		maskClosable: true,
		okButtonProps: {
			hidden: true
		},
		width: image.width,
		content: (
			<div
				key={`image-modal-wrap-${image.handle}`}
				className="image-modal-wrap">
				<GraphImg
					key={`large-${image.handle}`}
					image={{
						handle: image.handle,
						width: image.width,
						height: image.height
					}}
					maxWidth={1024}
					withWebp
					style={{
						width: image.width,
						height: image.height
					}}
				/>	
			</div>
		)
	  });
}