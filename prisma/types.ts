import { Prisma } from '@prisma/client'

const profileWithKycHistoryAndDocs = Prisma.validator<Prisma.ProfileArgs>()({
  include: {
    userKYCAML: true,
    documents: true,
  },
})

export type ProfileWithKycHistoryAndDocs = Prisma.ProfileGetPayload<typeof profileWithKycHistoryAndDocs>

