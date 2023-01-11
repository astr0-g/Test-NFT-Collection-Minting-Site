import { useState, useEffect } from "react"
import abiJson from "../constants/erc721abi.json"
import {
    useContractRead,
} from "wagmi"
export default function ERC721Mintednumber(props) {
    const [msupply, setMsupply] = useState("10000")
    const [tsupply, setTsupply] = useState("0")
    const { data: totalSupplydata } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainid,
        functionName: "totalSupply",
        watch: true,
    })
    const { data: maxSupplydata } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainid,
        functionName: "maxSupply",
        watch: true,
    })
    useEffect(() => {
        if (totalSupplydata) {
            // console.log(totalSupplydata.toString())
            setTsupply(totalSupplydata.toString())
        }
    }, [totalSupplydata])
    useEffect(() => {
        if (maxSupplydata) {
            console.log(maxSupplydata.toString())
            setMsupply(maxSupplydata.toString())
        }
    }, [maxSupplydata])
    return (
        <div>
            <div>
                Minted {tsupply} / MaxSupply {msupply}
            </div>
        </div>
    )
}
