'use server'

import { api } from "@/http/api-client"
import path from 'path'
import { writeFile } from "fs/promises"
import { v4 as uuidv4 } from 'uuid'

type Details = {
    name: string
    surname: string
    dateOfBirth: string
    passportNumber: string
    passportExpiryDate: string
    nationality: string
    passportCountryOfIssue: string
    phone: string
    email: string
    address: string
    city: string
    zipCode: string
    country: string
}

interface SaveDetailsResponse {
  solicitationId: string
}

export async function saveDetails(data: Details) {
  const result = await api.post<SaveDetailsResponse>('solicitation/save-details', {
    json: data
  }).json()

  return result
}

type Questions = {
  solicitationId: string

  hasOtherNationality: "true" | "false"
  otherNationality?: string | undefined

  hasOccupation: "true" | "false"
  occupation?:  string | undefined

  hasCriminalConviction: "true" | "false"
  hasCriminalConvictionLastYear?: "true" | "false" | undefined
  crimeHasBeenConvicted?:  string | undefined
  countryCrimeHasBeenConvicted?:  string | undefined
  convictedMoreThanOneYear?:  "true" | "false" | undefined
  hasEverConvictedMoreThanOneYear?:  "true" | "false" | undefined
  crimeConvictedMoreThanOneYear?:  string | undefined
  countryConvictedMoreThanOneYear?:  string | undefined
  initialDateConvictedMoreThanOneYear?:  string | undefined
  endDateConvictedMoreThanOneYear?:  string | undefined

  involvedIn: "true" | "false"
  whichSituationWasInvolvedIn?:  string[]
}

interface SaveQuestionResponse {
  solicitationId: string
  status: number
}

export async function saveQuestions(data: Questions) {
  const result = await api.post<SaveQuestionResponse>('solicitation/save-questions', {
    json: data
  }).json()

  return result
}

interface savePassportResponse {
  valid: boolean
  base64: string
  errors: string[]
  error_msg: string
  error: object
}

export async function analyzePassport(imageBase64: string ) {
  const result = await api.post<savePassportResponse>('solicitation/analyze-passport', {
    json: {
      imageBase64
    }
  }).json()

  return result
}

type Passport = {
  solicitationId: string
  imageBase64: string
}

export async function savePassport({ solicitationId, imageBase64 }: Passport ) {
  const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  const filename =  `${uuidv4()}.jpg`

  const imagePath = path.join("passport-uploads/" + filename)
  
  await writeFile(
    imagePath,
    buffer
  )

  const result = await api.post<savePassportResponse>('solicitation/save-passport', {
    json: {
      solicitationId,
      passportUrl: imagePath
    }
  }).json()

  return result
}

interface savePhotoResponse {
  valid: boolean
  base64: string
  errors: string[]
  error_msg: string
  error: object
}

export async function analyzePhoto(imageBase64: string ) {
  const result = await api.post<savePhotoResponse>('solicitation/analyze-photo', {
    json: {
      imageBase64
    }
  }).json()

  return result
}

type Photo = {
  solicitationId: string
  imageBase64: string
}

export async function savePhoto({ solicitationId, imageBase64 }: Photo ) {
  const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  const filename =  `${uuidv4()}.jpg`

  const imagePath = path.join("photo-uploads/" + filename)
  
  await writeFile(
    imagePath,
    buffer
  )

  const result = await api.post<savePhotoResponse>('solicitation/save-photo', {
    json: {
      solicitationId,
      photoUrl: imagePath
    }
  }).json()

  return result
}
