import { gql } from "@apollo/client";

/* Get page titles and IDs for navigation,
 * as well as the site's first (and only) configuration */
export const GET_INIT = gql`
  query Initialization {
    pages {
      title
      id
    }
    configurations(first: 1) {
      id
      siteName
      shortName
      siteDescription
      siteKeywords
      appleTouchIcon {
        url
      }
      favicon {
        url
      }
      additionalFonts {
        fileName
        url
      }
      manifestJson
      logoHtml
      primaryColor {
        hex
      }
      accentColor {
        css
      }
      footerContent {
        html
      }
      physicalAddress
      contactEmail
      contactPhoneNumber
      facebookLink
      instagramLink
      geoLocation {
        latitude
        longitude
      }
    }
  }
`;
