import styles from "../styles/Home.module.css"
import { useState, useEffect } from "react"
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Bottom from "./Bottom"
import Link from "next"
import Mintednumber from "./Mintednumber"
import MintButton from "./MintButton"
import { collectionlistmumbai } from "../constants/nftcollectionlistmumbai"
import { collectionlistgoerli } from "../constants/nftcollectionlistgoerli"
import abi from "../constants/abi.json"
import {
    usePrepareContractWrite,
    useAccount,
    useConnect,
    useContract,
    useContractRead,
    useContractWrite,
    useNetwork,
    useSwitchNetwork,
    useWaitForTransaction,
} from "wagmi"
import { useToasts } from "react-toast-notifications"
export default function Mintingcomponent() {
    const { address } = useAccount()
    const { addToast } = useToasts()
    const { chain, isSuccess } = useNetwork()
    const [chainnow, setchainnow] = useState("")
    const [json, setjson] = useState()
    const [messagejson, setMessagejson] = useState("")
    const { connector: activeConnector, isConnected } = useAccount()
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
    useEffect(() => {
        pullJson(collectionlistgoerli)
    }, [])
    useEffect(() => {
        if (chain) {
            if (chain["id"] == 5) {
                pullJson(collectionlistgoerli)
                // console.log(1)
            }
            if (chain["id"] == 80001) {
                pullJson(collectionlistmumbai)
                // console.log(2)
            }
        }
    }, [chain])
    useEffect(() => {
        if (switchNetwork) {
            setchainnow(chain["id"])
            if (chain["id"] == 5) {
                pullJson(collectionlistgoerli)
                // console.log(1)
            }
            if (chain["id"] == 80001) {
                pullJson(collectionlistmumbai)
                // console.log(2)
            }
        }
    }, [chain])
    // console.log(switchNetwork)
    useEffect(() => {}, [])
    let displayData
    async function pullJson(e) {
        // console.log("pull")
        displayData = await e.map(function (msg) {
            // console.log(msg.address)
            return (
                <div
                    key={msg.id}
                    className="text-white font-Prompt border-2 border-white rounded-2xl outline outline-2 outline-offset-4"
                >
                    <div className="">{msg.name}</div>
                    <div className="flex justify-center items-center">
                        <img src={msg.pic} height="300" width="300"></img>
                    </div>
                    <Mintednumber contractaddress={msg.address} chainid={msg.chain} />
                    <MintButton
                        address={address}
                        contractaddress={msg.address}
                        chainid={msg.chain}
                        symbol={msg.symbol}
                        scan={msg.scan}
                    />
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
            <div className="mt-8 grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-40 items-center justify-center text-center">
                {messagejson}
            </div>
        </div>
    )
}
