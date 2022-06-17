// ChainRaise API
export type CRResponse = {
  error: boolean
  message: string
  body: any
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
