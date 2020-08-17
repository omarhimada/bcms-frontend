import { gql } from '@apollo/client';

// Get page content using the ID provided
export const GET_PAGE = gql`
	query Page($pageId: ID!) {
		page(where: {id: $pageId}) {
			id,
			heading,
			content {
				html
			},
			dynamicContent,
			image {
				url
			}
		}
	}
`;

// Get page titles and IDs for navigation
export const GET_PAGES_NAV = gql`
	query PagesNav {
		pages {
			title
			id
		}
	}
`;


// Get all services
export const GET_SERVICES = gql`
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
export const GET_TEAM_MEMBERS = gql`
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
export const GET_FAQS = gql`
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