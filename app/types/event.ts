import { DesmosProfile } from "@/types/desmos";
import { BondscapePreviewImage } from "@/types/image";

export interface EventLocation {
  /**
   * Name of the location.
   */
  name: string;
  /**
   * Address of the location.
   */
  formattedAddress: string;
  /**
   * Country of the location.
   */
  country: string;
  /**
   * Link to the location on Google Maps.
   */
  url: string;
}

export interface Organizer {
  /**
   * Organizer Desmos profile.
   */
  organizer?: DesmosProfile;
  /**
   * Organizer address.
   */
  organizerAddress: string;
}

export interface Validator {
  /**
   * validator Desmos profile.
   */
  validator?: DesmosProfile;
  /**
   * validator address.
   */
  validatorAddress: string;
}

export interface EventTicketCategory {
  /**
   * Ticket id.
   */
  id: string;
  /**
   * Ticket name.
   */
  name: string;
  description?: string;
  coverPicUrl?: string;
  startDate?: string;
  startDateLocalized?: string;
  endDate?: string;
  endDateLocalized?: string;
  ticketsSold?: {
    aggregate: {
      count: number;
    };
  };
  ticketsPerUser: number;
  totalTicketsAvailable: number;
  validators?: Validator[];
}

export interface Event {
  /**
   * Event id.
   */
  id: string;
  /**
   * Event name.
   */
  name: string;
  /**
   * Event description.
   */
  description: string;
  /**
   * Event cover picture.
   */
  coverPic: string;
  /**
   * Event cover picture hash.
   */
  coverPicHash: {
    hash: string;
  };
  /**
   * Event start date.
   */
  startDate: string;
  /**
   * Event start date localized.
   */
  startDateLocalized: string;
  /**
   * Event end date.
   */
  endDate: string;
  /**
   * Event end date localized.
   */
  endDateLocalized: string;
  /**
   * Event location.
   */
  googlePlaceId: string;
  location: EventLocation;
  /**
   * Event organizers
   */
  organizers: Organizer[];
  /**
   * Event join code.
   */
  joinCode: string;
  /**
   * Event website.
   */
  website: string;
  /**
   * Event tags.
   */
  tags: string[];
  /**
   * Event categories.
   */
  categories: {
    category_id: number;
    category: {
      id: number;
      name: string;
    };
  }[];
  /**
   * Event status
   */
  status?: "published" | "draft";
  /**
   * Link to share this event.
   */
  detailsLink: string;
  /**
   * Event tickets categories.
   */
  ticketsCategories: EventTicketCategory[];
  isPrivate: boolean;
}

export interface TicketCategoryValues {
  id?: string;
  coverPic?: BondscapePreviewImage;
  coverPicUrl?: string;
  description?: string;
  category: string;
  maxQuantityPerPerson: number;
  ticketsSold?: number;
  maxQuantityPerCategory: number;
  availableFrom?: string;
  availableUntil?: string;
  validators: Validator[];
}

export interface CreateEventValues {
  /**
   * Event status.
   */
  status: "published" | "draft";
  /**
   * Event cover picture.
   */
  coverPic?: BondscapePreviewImage;
  coverPicUrl?: string;
  /**
   * Event name.
   */
  eventName: string;
  /**
   * Event details.
   */
  eventDetails: string;
  /**
   * Event start date.
   */
  startDate?: string;
  startDateLocalized?: string;
  /**
   * Event end date.
   */
  endDate?: string;
  endDateLocalized?: string;
  /**
   * Event categories.
   */
  categories?: EventCategory[];
  /**
   * Event website.
   */
  website?: string;
  /**
   * Event place id (Google Maps).
   */
  placeId?: string;
  location?: EventLocation;
  /**
   * Event organizers, creator + co-hosts.
   */
  organizers: Organizer[];
  /**
   * Event tags.
   */
  tags?: string[];
  /**
   * Event tickets categories.
   */
  ticketsCategories?: TicketCategoryValues[];
  isPrivate?: boolean;
}

export interface GQLEventsResult {
  events: Event[];
}

export interface GQLEventResult {
  event: Event;
}

export interface EventCategory {
  id: number;
  name: string;
}

export interface GQLEventCategoriesResult {
  events_categories: EventCategory[];
}

export interface GQLEventTagsResult {
  event_tags: {
    tag: string;
  }[];
}

export interface EventRequestParams {
  status: string;
  eventName: string;
  eventDetails: string;
  coverPicUrl?: string;
  startDate?: string;
  endDate?: string;
  categoriesIds?: number[];
  website?: string;
  placeId?: string;
  organizersAddresses: string[];
  tags?: string[];
  isPrivate?: boolean;
}

export interface TicketCategoryRequestParams {
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  total_tickets_available: number;
  tickets_per_user: number;
  tickets_image_url?: string;
  validators_addresses: string[];
}

export interface GQLTicketCategoryValidatorsResult {
  eventTicketCategoryValidators: Validator[];
}
