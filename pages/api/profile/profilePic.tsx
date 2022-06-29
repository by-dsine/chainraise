import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import fs from 'fs'
import fetch from 'node-fetch'
import formidable, { File } from 'formidable'
import { fileURLToPath } from 'url'
import { s3 } from '../../../lib/s3'
import { makeID } from '../../../utils/utils'
import { prisma } from '../../../lib/db'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Fetching session...')
  const session = await getSession({ req })

  if (!session?.user?.uid) {
    console.log('Session or user id not found.')
    return res.status(500).json({ message: 'No user id found.' })
  }

  switch (req.method) {
    case 'POST':
      const form = formidable()
      form.parse(req, async(err, fields, files) => {
        if (!files.demo) {
          res.status(400).json({message: "No file uploaded"})
        }
        var fileToPut = files.demo as formidable.File

        try {
          const id = makeID(12)
          return s3.putObject({
            Bucket: process.env.DO_SPACES_CF_PUBLIC_BUCKET!,
            Key: process.env.DO_PROFILE_PIC_FOLDER + "/" + id,
            Body: fs.createReadStream(fileToPut.filepath),
            ACL: 'public-read',
          }, async() => res.status(201).json({message: "File uploaded"}))
        } catch (e) {
          console.log(e)
          res.status(500).json({message: "Error uploading file"})
        }
      })
      // let status = 200,
      //   resultBody = {
      //     status: 'ok',
      //     message: 'Files were uploaded successfully',
      //   }

      // const files = await new Promise<ProcessedFiles | undefined>(
      //   (resolve, reject) => {
      //     const form = new formidable.IncomingForm()
      //     const files: ProcessedFiles = []
      //     form.on('file', function (field, file) {
      //       files.push([field, file])
      //     })
      //     form.on('end', () => resolve(files))
      //     form.on('error', (err) => reject(err))
      //     form.parse(req, () => {
      //       //
      //     })
      //   }
      // ).catch((e) => {
      //   console.log(e)
      //   status = 500
      //   resultBody = {
      //     status: 'fail',
      //     message: 'Upload error',
      //   }
      // })

      // if (files?.length) {
      //   for (const file of files) {
      //     // generate id
      //     const fileId = makeID(12) // avoid file name collision

      //     console.log("attempting upload")
      //     s3.putObject(
      //       {
      //         Bucket: 'chainraise-cf', // Add bucket name here
      //         ACL: 'public-read', // Specify whether anyone with link can access the file
      //         Key: `profile-pics/${fileId}`, // Specify folder and file name
      //         Body: fs.readFileSync(file[1].filepath),
      //       }
      //     ).send((err, data) => {
      //       console.log("I'm back")
      //       if (err) return res.status(500).json({message:"Error uploading to chainraise-cf"})
      //       // Unlink file
      //       fs.unlinkSync(file[1].filepath)
      //       // Return file url or other necessary details
            
      //       // update profile pic field
      //       // call prisma here
      //       return res.status(200).json({ message : data})
      //     })

      //   }
      // }
      //res.status(status).json(resultBody)

    default:
      return res.status(405).end(`Method ${req.method} not allowed`)
  }
}
