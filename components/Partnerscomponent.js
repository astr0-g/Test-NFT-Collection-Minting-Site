import { useState, useEffect } from "react"
import { partnerlist } from "../constants/partnerslist"
export default function Partnerscomponent() {
    const [partnerInfo, setpartnerInfo] = useState("")
    useEffect(() => {
        pullpartnerInfo(partnerlist)
    }, [])
    let displayData
    async function pullpartnerInfo(e) {
        displayData = await e.map(function (msg) {
            return (
                <div key={msg.id} className="ml-4 mr-4 mt-4 mb-4">
                    <a href={msg.link}>
                        <div className="ml-4 mr-4 mt-4 mb-4 text-white">
                            <div className="flex justify-center items-center">
                                <img src={msg.pic} height="200" width="200"></img>
                            </div>
                            <div className="font-bold text-2xl">{msg.name}</div>
                        </div>
                    </a>
                </div>
            )
        })
        setpartnerInfo(displayData)
    }
    return (
        <div>
            <div className="mt-8 grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-40 items-center justify-center text-center">
                {partnerInfo}
            </div>
        </div>
    )
}
