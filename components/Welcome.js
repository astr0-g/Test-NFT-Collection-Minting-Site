import styles from "../styles/Home.module.css"
import Mintingcomponent from "./Mintingcomponent"
import { useState, useEffect } from "react"
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Bottom from "./Bottom"
import Link from "next"
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
//https://cdn.discordapp.com/attachments/960590776570626098/1039674954213490828/martix.gif
export default function Welcome() {
    const { address } = useAccount()
    const { addToast } = useToasts()
    const { chain } = useNetwork()
    function connectWalletNotification() {
        addToast("Please Connect Wallet & Choose Right Network Before Proceed!", {
            appearance: "warning",
        })
    }
    return (
        <div className="">
            <div>
                <div className="grid items-center justify-items-center bg-no-repeat bg-cover bg-black bg-[url('https://64.media.tumblr.com/a523aac3670fb6af34ba6bf92a9a5917/60a389cd0631fc65-71/s640x960/ac4918cfe8959fe7c984f1af5e5faed7f4ef7a85.gifv')] relative">
                    <div className="mt-8 grid items-center justify-items-center text-center opacity-100 ">
                        <h1 className="mt-5 font-Prompt lg:text-8xl md:text-6xl sm:text-4xl font-bold text-slate-300">
                            DISCLAIMER
                        </h1>
                        <h1 className="mt-5 ml-5 mr-5 font-Prompt lg:text-3xl md:text-2xl sm:text-xl font-bold text-slate-300">
                            This is a minting site for mint test NFT from variety of collection
                            that helps decentralized Finance, NFT Finance,Social Finance, and other
                            kinds of Dapps building on Testnet, please choose the diresed testnet
                            after connecting your wallet.
                        </h1>
                        <h1 className="font-Prompt lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-300"></h1>

                        <p className="my-5 text-slate-200 text-sm sm:text-xs w-[50vw] lg:w-11/12"></p>

                        <p className="my-5 text-slate-200 text-sm sm:text-xs w-[50vw] lg:w-11/12"></p>
                    </div>
                    <div className="grid items-center justify-items-center bg-no-repeat bg-cover bg-black  relative">
                        <div className="mt-8 flex items-center">
                            <h1 className=" lg:text-4xl sm:text-xl font-bold text-white text-center">
                                Mint
                            </h1>
                        </div>
                    </div>
                    <Mintingcomponent />
                    <p className="mb-10"></p>
                </div>
            </div>
        </div>
    )
}
