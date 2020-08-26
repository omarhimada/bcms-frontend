import { gql } from '@apollo/client';

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
