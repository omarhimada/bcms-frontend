import * as React from 'react';
import { HeadingLevel } from 'baseui/heading';
import { Row, Col } from 'antd';
import Gallery from './Gallery';
import Services from './Services';
import FAQs from './FAQs';
import TeamMembers from './TeamMembers';

export default (params) => {
	if (params.type === null || params.type === 'None') return <></>;

	return (
		<Col xs={{ span: 24 }}>
			<HeadingLevel>
				<Row gutter={[16, 16]}>
					{{
						Services: <Services />,
						TeamMembers: <TeamMembers />,
						FAQs: <FAQs />,
						Gallery: <Gallery />
					}[params.type]}
				</Row>
			</HeadingLevel>
		</Col>
		
	);
};