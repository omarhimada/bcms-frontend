import { gql } from '@apollo/client';

// Get the first (and only) configuration
export const GET_CONFIGURATION = gql`
	query Configuration {
		configurations(first: 1) {
			primaryColor {
				hex
			}
			accentColor {
				css
			}
			logoHtml
			footerContent {
				html
			}
		}
	}
`;