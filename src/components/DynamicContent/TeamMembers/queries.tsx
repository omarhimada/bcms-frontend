import { gql } from '@apollo/client';

// Get all team members
export const GET_TEAM_MEMBERS = gql`
	query TeamMembers {
		teamMembers {
			profileImage {
				url,
				width
			}
			name
			blurb {
				html
			}
		}
	}
`;
