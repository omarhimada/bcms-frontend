import { gql } from '@apollo/client';

// Get all galleries
export const GET_GALLERIES = gql`
	query Galleries {
		galleries {
			title
			images {
				handle
				width
				height
			}
		}
  	}
`;
