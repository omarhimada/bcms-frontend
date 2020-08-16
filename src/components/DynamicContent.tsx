import * as React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Card, StyledBody } from 'baseui/card';
import { ListItem, ListItemLabel } from 'baseui/list';
import { Accordion, Panel } from "baseui/accordion";
import { Grid, Cell, BEHAVIOR } from 'baseui/layout-grid';
import ReactHtmlParser from 'react-html-parser';
import Loading from './Loading';
import { Block } from 'baseui/block';

// Get all services
const GET_SERVICES = gql`
	query ServiceCategories {
		serviceCategories {
			title
			services {
				name
				price
				per
				onSale
			}
		}
	}
`;

// Get all team members
const GET_TEAM_MEMBERS = gql`
	query TeamMembers {
		teamMembers {
			profileImage {
				url,
				width
			}
			name
			description
		}
	}
`;

// Get all FAQs
const GET_FAQS = gql`
	query FAQCategories {
		faqCategories {
			title
			questions {
				question
				answer {
					html
				}
			}
		}
	}
`;

export function renderServices(data) {
	return data.serviceCategories.map(serviceCategory =>
		<Cell key={`cell-${serviceCategory.title}`} span={[12, 6]}>
			<Card
				overrides={{
					Root: {
						style: {
							marginBottom: '1rem'
						}
					}
				}}
				key={serviceCategory.title}
				title={serviceCategory.title}>
				<ul className='services-ul'>
					{serviceCategory.services.map((service) =>
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
		</Cell>
	);
}

export function renderTeamMembers(data) {
	return data.teamMembers.map(teamMember =>
		<Cell key={`cell-${teamMember.name}`} span={4}>
			<Card
				overrides={{
					Root: {
						style: {
							marginBottom: '1rem',
							maxWidth: `${teamMember.profileImage.width}px`
						}
					}
				}}
				key={teamMember.name}
				headerImage={teamMember.profileImage.url}
				title={teamMember.name}>
				<StyledBody>
					{teamMember.description}
				</StyledBody>
			</Card>
		</Cell>
	);
}

export function renderFAQs(data) {
	return data.faqCategories.map(faqCategory =>
		<Panel key={`panel-${faqCategory.title}`} title={faqCategory.title}>
			<ul className='faq-ul'>
				{faqCategory.questions.map(q =>
					<ListItem key={`faq-${faqCategory.title}${q.question}`}>
						<ListItemLabel>{q.question}</ListItemLabel>
						<Block>
							{ReactHtmlParser(q.answer.html)}
						</Block>
					</ListItem>
					
				)}
			</ul>
		</Panel>
	);
}

export default (params) => {
	if (params.type === null) return <></>;
	const query = {
		'Services': GET_SERVICES,
		'TeamMembers': GET_TEAM_MEMBERS,
		'FAQs': GET_FAQS
	}[params.type];

	const { loading, error, data } = useQuery(query);

	if (loading) return (<Loading />);
	if (error) return (<span>Error! {error.message}</span>);

	switch (params.type) {
		case 'Services':
			return <Grid>{renderServices(data)}</Grid>;
		case 'TeamMembers':
			return <Grid behavior={BEHAVIOR.fluid}>{renderTeamMembers(data)}</Grid>;
		case 'FAQs':
			return <Grid><Cell span={12}><Accordion renderAll>{renderFAQs(data)}</Accordion></Cell></Grid>
		default:
			return <></>;
	}
};