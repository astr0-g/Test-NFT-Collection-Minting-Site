import styles from "../styles/Home.module.css"
import logo from "../public/logo.png"
import { useState, useEffect } from "react"
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Bottom from "./Bottom"
import Link from "next"
import { collectionlistmumbai } from "../constants/nft"
import { collectionlistgoerli } from "../constants/nft"
import abiJson from "../constants/abi.json"
import {
    usePrepareContractWrite,
    useAccount,
    useConnect,
    useContract,
    useContractRead,
    useContractWrite,
    useNetwork,
    useWaitForTransaction,
} from "wagmi"
import { useToasts } from "react-toast-notifications"
export default function Mintednumber(porps) {
    const [msupply, setMsupply] = useState("0")
    const [tsupply, setTsupply] = useState("0")
    const { data: totalSupply } = useContractRead({
        addressOrName: porps.contractaddress,
        contractInterface: abiJson.abi,
        chains: porps.chainID,
        functionName: "totalSupply",
        watch: true,
    })
    const { data: maxSupply } = useContractRead({
        addressOrName: porps.contractaddress,
        contractInterface: abiJson.abi,
        chains: porps.chainID,
        functionName: "maxSupply",
        watch: true,
    })
    useEffect(() => {
        if (totalSupply) {
            setTsupply(totalSupply.toString())
        }
    }, [totalSupply])
    useEffect(() => {
        if (maxSupply) {
            setMsupply(maxSupply.toString())
        }
    }, [maxSupply])
    return (
        <div>
            <div className="">Minted {tsupply}</div>
            <div className="">MaxSupply {msupply}</div>
        </div>
    )
}
