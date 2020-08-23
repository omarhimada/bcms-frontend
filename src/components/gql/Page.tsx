import { gql } from '@apollo/client';

// Get page content using the ID provided
export const GET_PAGE = gql`
	query Page($pageId: ID!) {
		page(where: {id: $pageId}) {
			id,
			title,
			heading,
			content {
				html
			},
			dynamicContent,
			carouselImages {
				url
				id
			},
			carouselCtaText,
			carouselCtaLink
		}
	}
`;