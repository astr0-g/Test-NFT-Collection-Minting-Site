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
import ethers from "ethers"
import { useToasts } from "react-toast-notifications"
export default function Mintednumber(porps) {
    const [msupply, setMsupply] = useState("0")
    const [tsupply, setTsupply] = useState("0")
    const { data: totalSupplydata } = useContractRead({
        addressOrName: porps.contractaddress,
        contractInterface: abiJson.abi,
        chains: porps.chainID,
        functionName: "totalSupply",
        watch: true,
    })
    const { data: maxSupplydata } = useContractRead({
        addressOrName: porps.contractaddress,
        contractInterface: abiJson.abi,
        chains: porps.chainID,
        functionName: "maxSupply",
        watch: true,
    })
    useEffect(() => {
        if (totalSupplydata) {
            setTsupply(totalSupplydata.toString())
        }
    }, [])
    useEffect(() => {
        if (maxSupplydata) {
            setMsupply(maxSupplydata.toString())
        }
    }, [])
    return (
        <div>
            <div className="text-white">Minted {tsupply}</div>
            <div className="text-white">MaxSupply {msupply}</div>
        </div>
    )
}
