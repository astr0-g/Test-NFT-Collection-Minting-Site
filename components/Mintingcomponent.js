import styles from "../styles/Home.module.css"
import logo from "../public/logo.png"
import { useState, useEffect } from "react"
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Bottom from "./Bottom"
import Link from "next"
import Mintednumber from "./Mintednumber"
import { collectionlistmumbai } from "../constants/nft"
import { collectionlistgoerli } from "../constants/nft"
import abi from "../constants/abi.json"
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
export default function Mintingcomponent() {
    const { address } = useAccount()
    const { addToast } = useToasts()
    const { chain } = useNetwork()
    const [chainnow, setchainnow] = useState(5)
    const [json, setjson] = useState(collectionlistgoerli)
    const [Messagejson, setMessagejson] = useState("")
    useEffect(() => {
        pullJson()
    }, [])
    useEffect(() => {
        if (chain) {
            if (chain["id"] == 5) {
                setjson(collectionlistgoerli)
                pullJson()
            } else if (chain["id"] == 80001) {
                setjson(collectionlistmumbai)
                pullJson()
            }
        }
    }, [])
    let displayData
    async function pullJson() {
        displayData = json.map(function (msg) {
            console.log(msg)
            return (
                <div key={msg.name} className="overflow-hidden">
                    <div>{msg.name}</div>
                    <div className="flex justify-center items-center">
                        <img src={msg.pic} height="300" width="300"></img>
                    </div>
                    <Mintednumber contractaddress={msg.address} chainid={msg.chain} />
                </div>
            )
        })
        setMessagejson(displayData)
    }
    function connectWalletNotification() {
        addToast("Please Connect Wallet & Choose Right Network Before Proceed!", {
            appearance: "warning",
        })
    }
    function refreshPage() {
        window.location.reload(false)
    }
    return (
        <div>
            <div className="mt-8  lg:grid lg:grid-cols-2 lg:gap-40 items-center justify-center text-center">
                {Messagejson}
            </div>
        </div>
    )
}
