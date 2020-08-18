import * as React from 'react';
import { Divider, Row, Col, Button, Modal } from 'antd';
import GraphImg from 'graphcms-image';
import { useQuery } from '@apollo/client';
import { Heading, HeadingLevel } from 'baseui/heading';
import Loading from '../Loading';
import { Gallery } from '../types/dynamic_content/Gallery';
import { GET_GALLERIES } from '../gql/dynamic_content/Gallery';

// Open a Modal with the full-size image inside
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
			<div className="image-modal-wrap">
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

export default () => {
	const { loading, error, data } = useQuery(GET_GALLERIES);

	if (loading) return (<Loading />);
	if (error) return (<span>Error! {error.message}</span>);

	const galleries: Gallery[] = data.galleries;

	return (
		<React.Fragment>
			<HeadingLevel>
				{galleries.map(gallery => 
					<Row justify="space-around" align="middle" gutter={[8, 8]}>
						<Heading>{gallery.title}</Heading>
						<Divider />
						{gallery.images.map(image => 
							<Col>
							<Button 
								//danger
								type='ghost'
								ghost
								onClick={() => _imageModal(image)}
								style={{
									width: '332px',
									height: '332px',
									padding: 0
								}}>
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
						)}
					</Row>
				)}
			</HeadingLevel>
		</React.Fragment>
	);
}
// class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false,
//     previewImage: '',
//     previewTitle: '',
//     fileList: [
//       {
//         uid: '-1',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-2',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-3',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-4',
//         name: 'image.png',
//         status: 'done',
//         url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//       },
//       {
//         uid: '-5',
//         name: 'image.png',
//         status: 'error',
//       },
//     ],
//   };

//   handleCancel = () => this.setState({ previewVisible: false });

//   handlePreview = async file => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     this.setState({
//       previewImage: file.url || file.preview,
//       previewVisible: true,
//       previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
//     });
//   };

//   handleChange = ({ fileList }) => this.setState({ fileList });

//   render() {
//     const { previewVisible, previewImage, fileList, previewTitle } = this.state;
//     const uploadButton = (
//       <div>
//         <PlusOutlined />
//         <div className="ant-upload-text">Upload</div>
//       </div>
//     );
//     return (
//       <div className="clearfix">
//         <Upload
//           action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//           listType="picture-card"
//           fileList={fileList}
//           onPreview={this.handlePreview}
//           onChange={this.handleChange}
//         >
//           {fileList.length >= 8 ? null : uploadButton}
//         </Upload>
//         <Modal
//           visible={previewVisible}
//           title={previewTitle}
//           footer={null}
//           onCancel={this.handleCancel}
//         >
//           <img alt="example" style={{ width: '100%' }} src={previewImage} />
//         </Modal>
//       </div>
//     );
//   }
// }