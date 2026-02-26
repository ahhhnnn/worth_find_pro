# Anonymous Report API Contract (Reserved for V1.0)

- Method: POST
- Path: /api/v1/reports/anonymous
- Body:
  - companyAlias: string
  - industry: string
  - cityTier: string
  - kScore: number
  - rating: string
  - factorsDigest: string[]
  - createdAt: ISO string
- Privacy: do not send phone number, name, or exact salary.
