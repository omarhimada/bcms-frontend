import * as React from 'react';
import { useQuery } from '@apollo/client';
import { Card } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import Loading from '../Loading';
import { Col, Typography } from 'antd';
import { GET_SERVICES } from '../gql/dynamic_content/Service';
import { ServiceCategory } from '../types/dynamic_content/Service';

const { Title } = Typography;

export default () => {
	const { loading, error, data } = useQuery(GET_SERVICES);

	if (loading) return (<Loading />);
	if (error) return (<span>Error! {error.message}</span>);

	return <React.Fragment>{_renderServices(data.serviceCategories)}</React.Fragment>;
};

// Render a Col containing a Card for each service category, which holds a List of products/services
export function _renderServices(serviceCategories: ServiceCategory[]) {
	return serviceCategories.map(serviceCategory =>
		<Col xs={{ span: 24 }} lg={{ span: 12 }}>
			<Card
				overrides={{
					Root: {
						style: {
							marginBottom: '1rem'
						}
					}
				}}
				key={serviceCategory.title}>
				<Title level={3}>
					{serviceCategory.title}
				</Title>
				<ul className='services-ul'>
					{serviceCategory.services.map(service =>
						<ListItem
							sublist
							key={`${serviceCategory.title}${service.name}`}
							endEnhancer={() => (
								<ListItemLabel>{service.price}&nbsp;{service.per}</ListItemLabel>
							)}>
							<ListItemLabel sublist>{service.name}</ListItemLabel>
						</ListItem>
					)}
				</ul>
			</Card>
		</Col>
	);
}