import React from "react";

// Create a context for the site configuration
export const SiteContext = React.createContext<Configuration | undefined>(
  undefined
);

export class Configuration {
  id: string;

  /**
   * The 'title' of the site
   */
  siteName: string;

  /**
   * The meta 'description' for the site
   */
  siteDescription: string;

  /**
   * The meta 'keywords' for the site
   */
  siteKeywords: string;

  /**
   * The favicon image for the site
   */
  favicon: MetaImage;

  /**
   * The 'logo192.png' for the site
   */
  appleTouchIcon: MetaImage;

  /**
   * The 'manifest.json' file to include in the site
   */
  manifestJson: string;

  /**
   * Additional fonts to download
   * (recommended: woff2, woff and ttf for each additional font)
   */
  additionalFonts: Font[];

  /**
   * HTML representing the site logo (e.g.: an <svg> element, or an <img>, etc.)
   */
  logoHtml: string;

  /**
   * The primary color to use across the site
   */
  primaryColor: Color;

  /**
   * The accent color to use across the site
   */
  accentColor: Color;

  /**
   * Rich-text: content to display at the footer of the page
   */
  footerContent: FooterContent;

  /**
   * Physical address to display as contact information
   */
  physicalAddress: string;

  /**
   * Geo-location of the physical address
   */
  geoLocation: Geolocation;

  /**
   * Email to display as contact information
   */
  contactEmail: string;

  /**
   * Phone number to display as contact information
   */
  contactPhoneNumber: string;

  /**
   * Facebook Link
   */
  facebookLink: string;

  /**
   * Instagram Link
   */
  instagramLink: string;

  constructor(
    id: string,

    siteName: string,
    siteDescription: string,
    siteKeywords: string,

    favicon: MetaImage,
    appleTouchIcon: MetaImage,
    manifestJson: string,

    additionalFonts: Font[],

    logoHtml: string,
    primaryColor: Color,
    accentColor: Color,
    footerContent: FooterContent,
    physicalAddress: string,
    geoLocation: Geolocation,
    contactEmail: string,
    contactPhoneNumber: string,
    facebookLink: string,
    instagramLink: string
  ) {
    this.id = id;

    this.siteName = siteName;
    this.siteDescription = siteDescription;
    this.siteKeywords = siteKeywords;

    this.favicon = favicon;
    this.appleTouchIcon = appleTouchIcon;
    this.manifestJson = manifestJson;

    this.additionalFonts = additionalFonts;

    this.logoHtml = logoHtml;
    this.primaryColor = primaryColor;
    this.accentColor = accentColor;
    this.footerContent = footerContent;
    this.physicalAddress = physicalAddress;
    this.geoLocation = geoLocation;
    this.contactEmail = contactEmail;
    this.contactPhoneNumber = contactPhoneNumber;
    this.facebookLink = facebookLink;
    this.instagramLink = instagramLink;
  }
}

export class Color {
  hex: string;

  constructor(hex: string) {
    this.hex = hex;
  }
}

export class MetaImage {
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}

export class FooterContent {
  html: string;

  constructor(html: string) {
    this.html = html;
  }
}

export class Font {
  fileName: string;

  url: string;

  constructor(fileName: string, url: string) {
    this.fileName = fileName;
    this.url = url;
  }
}

export class Geolocation {
  latitude: string;
  longitude: string;

  constructor(latitude: string, longitude: string) {
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
