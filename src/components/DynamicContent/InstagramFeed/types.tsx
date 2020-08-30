/**
 * IMPORTANT NOTE:
 * This is likely going to break/change/frustrate often because Instagram
 * has been known to change their public API quite often. If you want to
 * use this more seriously you should go through the official channels:
 * https://developers.facebook.com/docs/instagram-api/
 */
export interface PublicFeedResponse {
  graphql?: Graphql;
}

export interface Graphql {
  user?: User;
}

export interface User {
  biography?:                    string;
  full_name?:                    string;
  profile_pic_url?:              string;
  profile_pic_url_hd?:           string;
  edge_felix_video_timeline?:    EdgeFelixVideoTimeline;
  edge_owner_to_timeline_media?: EdgeOwnerToTimelineMedia;
}

export interface EdgeFelixVideoTimeline {
  count?:     number;
  page_info?: PageInfo;
  edges?:     EdgeFelixVideoTimelineEdge[];
}

export interface EdgeFelixVideoTimelineEdge {
  node?: PurpleNode;
}

export interface PurpleNode {
  __typename?:                string;
  id?:                        string;
  shortcode?:                 string;
  dimensions?:                Dimensions;
  display_url?:               string;
  edge_media_to_tagged_user?: EdgeMediaTo;
  fact_check_overall_rating?: null;
  fact_check_information?:    null;
  gating_info?:               null;
  media_overlay_info?:        null;
  media_preview?:             string;
  owner?:                     Owner;
  is_video?:                  boolean;
  accessibility_caption?:     null;
  dash_info?:                 DashInfo;
  has_audio?:                 boolean;
  tracking_token?:            string;
  video_url?:                 string;
  video_view_count?:          number;
  edge_media_to_caption?:     EdgeMediaTo;
  edge_media_to_comment?:     Edge;
  comments_disabled?:         boolean;
  taken_at_timestamp?:        number;
  edge_liked_by?:             Edge;
  edge_media_preview_like?:   Edge;
  location?:                  null;
  thumbnail_src?:             string;
  thumbnail_resources?:       ThumbnailResource[];
  felix_profile_grid_crop?:   FelixProfileGridCrop;
  encoding_status?:           null;
  is_published?:              boolean;
  product_type?:              string;
  title?:                     string;
  video_duration?:            number;
}

export interface DashInfo {
  is_dash_eligible?:    boolean;
  video_dash_manifest?: null;
  number_of_qualities?: number;
}

export interface Dimensions {
  height?: number;
  width?:  number;
}

export interface Edge {
  count?: number;
}

export interface EdgeMediaTo {
  edges?: EdgeMediaToCaptionEdge[];
}

export interface EdgeMediaToCaptionEdge {
  node?: FluffyNode;
}

export interface FluffyNode {
  text?: string;
}

export interface FelixProfileGridCrop {
  crop_left?:   number;
  crop_right?:  number;
  crop_top?:    number;
  crop_bottom?: number;
}

export interface Owner {
  id?:       string;
  username?: Username;
}

export enum Username {
  Beauteraclinic = "beauteraclinic",
}

export interface ThumbnailResource {
  src?:           string;
  config_width?:  number;
  config_height?: number;
}

export interface PageInfo {
  has_next_page?: boolean;
  end_cursor?:    null | string;
}

export interface EdgeOwnerToTimelineMedia {
  count?:     number;
  page_info?: PageInfo;
  edges?:     EdgeOwnerToTimelineMediaEdge[];
}

export interface EdgeOwnerToTimelineMediaEdge {
  node?: TentacledNode;
}

export interface TentacledNode {
  __typename?:                Typename;
  id?:                        string;
  shortcode?:                 string;
  dimensions?:                Dimensions;
  display_url?:               string;
  edge_media_to_tagged_user?: EdgeMediaTo;
  fact_check_overall_rating?: null;
  fact_check_information?:    null;
  gating_info?:               null;
  media_overlay_info?:        null;
  media_preview?:             string;
  owner?:                     Owner;
  is_video?:                  boolean;
  accessibility_caption?:     string;
  edge_media_to_caption?:     EdgeMediaTo;
  edge_media_to_comment?:     Edge;
  comments_disabled?:         boolean;
  taken_at_timestamp?:        number;
  edge_liked_by?:             Edge;
  edge_media_preview_like?:   Edge;
  location?:                  Location | null;
  thumbnail_src?:             string;
  thumbnail_resources?:       ThumbnailResource[];
}

export enum Typename {
  GraphImage = "GraphImage",
}

export interface Location {
  id?:              string;
  has_public_page?: boolean;
  name?:            string;
  slug?:            string;
}
