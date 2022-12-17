import styles from "../styles/Home.module.css"
import { useState, useEffect } from "react"
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Bottom from "./Bottom"
import Link from "next"
import Mintednumber from "./Mintednumber"
import MintButton from "./MintButton"
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
    const { chain, isSuccess } = useNetwork()
    const [chainnow, setchainnow] = useState("")

    const [json, setjson] = useState(collectionlistmumbai)
    const [messagejson, setMessagejson] = useState("")
    const { connector: activeConnector, isConnected } = useAccount()
    useEffect(() => {
        if (json == collectionlistgoerli) {
            pullJson()
        }
        if (json == collectionlistmumbai) {
            pullJson()
        }
    }, [])
    useEffect(() => {
        if (chain) {
            setchainnow(chain["id"])
            // console.log(chain["id"])
            if (chain["id"] == 5) {
                // console.log(1)
                
                setjson(collectionlistgoerli)
                setMessagejson("")
                pullJson()
            }
            if (chain["id"] == 80001) {
                // console.log(2)
                setjson(collectionlistmumbai)
                setMessagejson("")
                pullJson()
            }
        }
    }, [chain])
    useEffect(() => {}, [])
    let displayData
    async function pullJson() {
        // console.log("pull")
        displayData = await json.map(function (msg) {
            // console.log(msg)
            return (
                <div key={msg.name} className="text-white font-Prompt">
                    <div className="mt-6">{msg.name}</div>
                    <div className="flex justify-center items-center">
                        <img src={msg.pic} height="300" width="300"></img>
                    </div>
                    <Mintednumber contractaddress={msg.address} chainid={msg.chain} />
                    <MintButton
                        address={address}
                        contractaddress={msg.address}
                        chainid={msg.chain}
                    />
                </div>
            )
        })
        await setMessagejson(displayData)
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
            <div className="mt-8 grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-40 items-center justify-center text-center">
                {messagejson}
            </div>
        </div>
    )
}
