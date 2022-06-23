// ChainRaise API
export type CRResponse = {
  error: boolean
  message: string
  body: any
}

export type CRAdminStatistics = {
  userCount: number
  offeringsCount: number
}

export type DisplayAdminInfo = {
  offerings: DisplayAdminOffering[]
  users: DisplayAdminUser[] 
}

export type DisplayAdminUser = {
  uid: string
  name: string
  accountType: string
  kycStatus: string
  amlStatus: string
  accreditation: string
}

export type DisplayAdminOffering = {
  offeringId: string
  name: string
  slug: string
  status: string
  goal: number
  pledged: number
  startDate: string
  endDate: string
}

export type NewOrganizationResponse = {
  message: string
  organizationName: string
  organizationId: string
}

export type GetOrganizationResponse = {
  organizationName: string
  organizationId: string
}

// Offerings 
export type DisplayOffering = {
  offeringId: string
  name: string
  summary: string
  description: string
  slug: string
  status: string
  goal: string
  pledged: string
  minimum: number
  startDate: string
  endDate: string
  sections: DisplayOfferingSection[]
  resources: DisplayOfferingResource[]
}

export type DisplayOfferingSection = {
  id: string
  title: string
  subtitle: string
  order: number
  displayOrder: number
  resources: DisplayOfferingSectionResource[]
}

export type DisplayOfferingSectionResource = {
  id: string
  title: string
  subtitle: string
  description: string
  location: string
  type: string
  order: number
  displayOrder: number
}

export type DisplayOfferingResource = {
  id: string
  title: string
  description: string
  location: string
  type: string
  order: number
  displayOrder: number
}

// Form Types
export type INewPostForm = {
  body: string
  username: string
  profileImg: string
  image?: string
  mood?: string
}

export type InvestmentAmountForm = {
  investmentAmount: number
}

export type AccountTypeForm = {
  accountType: string
  entityName: string
}

export type PersonalInformationForm = {
  username: string
  firstName?: string
  middleName?: string
  lastName?: string
  address?: string
  city?: string
  state?: string
  country?: string
  zipCode?: string
  email?: string
  phone?: string
  dob?: string
  residence?: string
}

export type ContactInformationForm = {
  firstName: string
  middleName: string
  lastName: string
  email: string
  phoneNumber: string
  country: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
}

export type OrganizationPrimaryIssuerForm = {
  organizationName: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type OfferingForm = {
  organizationId: string
  offeringName: string
  startDate: string
  endDate: string
  targetAmount: number
  minimumAmount: number
  maximumAmount: number
  price: number
  issueType: string
  description: string
}

export type GetOrganizationForm = {
  organizationName: string
  organizationId: string
}

export type AdminEditOffering = {
  organizationName: string
  offeringName: string
  startDate: string
  endDate: string
  targetAmount: number
  minimumAmount: number
  maximumAmount: number
  price: number
  issueType: string
  description: string
}

export type AdminDisplayTransaction = {
  id: string
  totalAmount: number
  type: string
  units: number
  purchaserName: string
}

// North Capital API types
// createParty
type CreatePartyResponse = {
  statusCode: string
  statusDesc: string
  partyDetails: (boolean | PartyDetail[])[]
}

type PartyDetail = {
  partyId: string
  KYCstatus: string
  AMLstatus: string
}
// KYC/AML
type BasicKYCAMLResponse = {
  statusCode: string
  statusDesc: string
  kyc: BasicKYCAMLBody
}

type BasicKYCAMLBody = {
  response: KYCAMLReport
  kycstatus: string
  amlstatus: string
}

type KYCAMLReport = {
  'id-number': string
  'summary-result': NCKeyMessage
  results: NCKeyMessage
  qualifiers: KYCAMLQualifiers
  idnotescore: string
}

type NCKeyMessage = {
  key: string
  message: string
}

type KYCAMLQualifiers = {
  qualifier: NCKeyMessage[]
}

type KYCAMLStatus = {
  kycStatus: string
  amlStatus: string
}

type IssuerResponse = {
  statusCode: string
  statusDesc: string
  issuerDetails: (boolean | IssuerDetails[])[]
}

type IssuerDetails = {
  issuerId: string
  issuerStatus: string
}

type OfferingResponse = {
  statusCode: string
  statusDesc: string
  offeringDetails: (boolean | OfferingDetails[])[]
}

type OfferingDetails = {
  offeringId: string
  offeringStatus: string
}
// Sanity Types
export interface Post {
  _id: string
  _createdAt: string
  title: string
  author: {
    name: string
    image: string
  }
  comments: Comment[]
  description: string
  mainImage: {
    asset: {
      url: string
    }
  }
  slug: {
    current: string
  }
  body: [object]
}

export interface Comment {
  approved: boolean
  comment: string
  email: string
  name: string
  post: {
    _ref: string
    _type: string
  }
  _createdAt: string
  _id: string
  _rev: string
  _type: string
  _updatedAt: string
}
