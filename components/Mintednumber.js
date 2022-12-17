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
export default function Mintednumber(props) {
    const [msupply, setMsupply] = useState("10000")
    const [tsupply, setTsupply] = useState("0")
    const { data: totalSupplydata } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainID,
        functionName: "totalSupply",
        watch: true,
    })
    const { data: maxSupplydata } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainID,
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
            <div className="">
                Minted {tsupply} / MaxSupply {msupply}
            </div>
        </div>
    )
}
