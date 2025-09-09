import { type Request, type Response} from 'express'
import { apiKey, baseURL } from '../config/config.js';



export class VolumeController {

    static getVolumeById = async (req: Request, res: Response) => {
        try {
            const {volumeId} = req.params;           

            const url = `${baseURL}/volume/${volumeId}/?api_key=${apiKey}&format=json`

            const response = await fetch(url, {
                headers: {
                    "User-Agent" : "ComicApp"
                }
            })

            if(!response.ok){
                throw new Error(`ComicVine error: ${response.statusText}`);
            }

            const data = await response.json()
            res.json(data)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al consultar ComicVine" });
        }
    }
    
    static getVolumeByPublisher = async (req: Request, res: Response) => {
        try {
            
            const limit = req.query.limit || 10
            const publisherId = req.params

            const url = `${baseURL}/volumes/?api_key=${apiKey}&filter=publisher:${publisherId}&format=json&limit=${limit}`

            const response = await fetch(url, {
                headers: {
                    "User-Agent" : "ComicApp"
                }
            })

            if(!response.ok){
                throw new Error(`ComicVine error: ${response.statusText}`);
            }

            const data = await response.json()
            res.json(data)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al consultar ComicVine" });
        }
    }

    
    static getFeaturedVolumesByPublisher = async (req: Request, res: Response) => {
        try {
            const { publisherId } = req.params

            const now = new Date();
            const currentYear = now.getFullYear();
            const lastYear = currentYear - 1;

            const startDate = new Date(lastYear, 0, 1);
            const endDate = new Date();
            endDate.setHours(23, 59, 59);

            const formatDate = (d: Date) => d.toISOString().split("T")[0];

            const url = `${baseURL}/volumes/?api_key=${apiKey}&format=json&filter=date_added:${formatDate(startDate)}|${formatDate(endDate)}&field_list=id,name,image,publisher,date_added&sort=date_added:desc&limit=10`;


            const response = await fetch(url, {
                headers: {
                    "User-Agent": "Comic-App"
                }
            })

            if(!response.ok){
                throw new Error(`ComicVine error: ${response.statusText}`);
            }

            const data : any = await response.json()

            const volumes = data.results.filter((v : any) => v.publisher?.id === Number(publisherId))

            console.log(volumes)

            res.json(volumes)
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al consultar ComicVine" });
        }
    }


    // static getFeaturedVolumesByPublisher = async (req: Request, res: Response) => {
    //     try {
    //         const { publisherId } = req.params

    //         const now = new Date();
    //         const currentYear = now.getFullYear();
    //         const lastYear = currentYear - 1;

    //         const startDate = new Date(lastYear, 0, 1);
    //         const endDate = new Date();
    //         endDate.setHours(23, 59, 59);

    //         const formatDate = (d: Date) => d.toISOString().split("T")[0];

    //         const url = `${baseURL}/volumes/?api_key=${apiKey}&format=json&filter=date_added:${formatDate(startDate)}|${formatDate(endDate)}&field_list=id,name,image,publisher,date_added&sort=date_added:desc&limit=10`;


    //         const response = await fetch(url, {
    //             headers: {
    //                 "User-Agent": "Comic-App"
    //             }
    //         })

    //         if(!response.ok){
    //             throw new Error(`ComicVine error: ${response.statusText}`);
    //         }

    //         const data : any = await response.json()

    //         const volumes = data.results.filter((v : any) => v.publisher?.id === Number(publisherId))

    //         console.log(volumes)

    //         res.json(volumes)
            
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ error: "Error al consultar ComicVine" });
    //     }
    // }
}