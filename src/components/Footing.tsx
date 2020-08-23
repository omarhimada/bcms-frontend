import * as React from 'react';
import { ThemeProvider, DarkTheme } from 'baseui';
import { StyledLink } from "baseui/link";
import { Row, Col, Descriptions } from 'antd';
import { Configuration } from './types/Configuration';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

/* Use the retrieved configuration to render the footer,
 * including social links and contact details */
export default (params) => {
	const configuration: Configuration = params.configuration;
	return (
		<ThemeProvider theme={DarkTheme}>
			<Row style={{ maxWidth: '1376px', margin: '0 auto' }} justify="center">
				<Col xs={12} sm={12} md={12} lg={6} key='contact-col-1'>
					<Descriptions title="Contact" size={'small'} column={{ xxl: 1, xs: 1 }}>
						<Descriptions.Item span={3} label='Phone'>
							<StyledLink
								href={`tel:${configuration.contactPhoneNumber}`}
								animateUnderline>
								{configuration.contactPhoneNumber}
							</StyledLink>
						</Descriptions.Item>
						<Descriptions.Item span={3} label='Email'>
							<StyledLink
								href={`mailto:${configuration.contactEmail}`}
								animateUnderline>
								{configuration.contactEmail}
							</StyledLink>
						</Descriptions.Item>
					</Descriptions>
				</Col>
				<Col xs={12} sm={12} md={12} lg={6} key='contact-col-2'>
					<Descriptions title="Address" size={'small'}>
						<Descriptions.Item>
							{configuration.physicalAddress.split('\n').map(line => <>{line}<br /></>)}
						</Descriptions.Item>
					</Descriptions>
				</Col>
				<Col xs={12} sm={12} md={12} lg={6} key='contact-col-3'>
					<Descriptions title="Connect" size={'small'}>
						<Descriptions.Item>
							<StyledLink
								href={configuration.facebookLink}>
								<FacebookOutlined 
									style={{ 
										fontSize: '2rem',
										color: 'rgba(255,255,255,0.85' 
									}} 
								/>
							</StyledLink>
						</Descriptions.Item>
					</Descriptions>
				</Col>
				<Col xs={12} sm={12} md={6} key='contact-col-4'>
					<Descriptions title="Instagram" size={'small'}>
						<Descriptions.Item>
							<StyledLink
								href={configuration.instagramLink}>
								<InstagramOutlined 
									style={{ 
										fontSize: '2rem',
										color: 'rgba(255,255,255,0.85' 
									}} 
								/>
							</StyledLink>
						</Descriptions.Item>
					</Descriptions>
				</Col>
			</Row>
		</ThemeProvider>
	);
};