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
			carouselImages {
				url
			},
			carouselCtaText,
			carouselCtaLink
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