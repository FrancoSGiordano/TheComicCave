import './DetailsView.css'
import Details from '../../components/Details/Details'
import ShareCard from '../../components/ShareCard/ShareCard'
import { useEffect, useState } from 'react'

export default function DetailsView(){
    const [ShareCardOpen, setShareCardOpen] = useState(false)

    return (
        <>   
        <div className='viewcontent'>
            <Details
                onToggleShareCard={()=>setShareCardOpen(!ShareCardOpen)}
                isOpen = {ShareCardOpen}
            />

        </div> 

        </>
    )
}
