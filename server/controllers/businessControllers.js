import Organization from '../models/organization'
import { verificationCode } from '../utils/verificationCode'

export const createBusiness = async(req, res, next)=> {
    const { name, email } = req.body
    try {
        if(!name || !email){
            return res.status.json({
                success: false,
                message: "All fields are required"
            })
        }

        //Find existing business
        const existingOrganization = await Organization.findOne({ email })

        if(existingOrganization){
           return res.status.json({
                success: false,
                message: "A business with this email already exist"
            }) 
        }

        const slugName = `org-${name.toLowerCase()}`
        const ticketPrefix = `${name.slice(0, 3)}`
        const now = new Date()
        const codeDuration = new Date(now.getTime() + 15 * 60 * 1000)

        //Create Business
        const business = await Organization.create({
            name,
            slug: slugName,
            ticketPrefix,
            verificationCode,
            verificationCodeExpiresAt: codeDuration
        })

        //Send Verification Email
        

        
    } catch (error) {
        next(error)
    }
}