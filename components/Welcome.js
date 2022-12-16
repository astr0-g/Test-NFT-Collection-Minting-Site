import styles from "../styles/Home.module.css"
import logo from "../public/logo.png"
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
                <div className="grid items-center justify-items-center bg-no-repeat bg-cover bg-black bg-[url('https://media.tenor.com/MiiSaoOtKHgAAAAC/black-background.gif')] relative">
                    <div className="mt-8 grid items-center justify-items-center text-center opacity-100 ">
                        <h1 className="mt-5 font-Prompt lg:text-7xl md:text-6xl sm:text-4xl font-bold text-slate-300">
                            DISCLAIMER
                        </h1>
                        <h1 className="mt-5 font-Prompt lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-300">
                            This is a minting site for mint test NFT from variety of collection
                            that helps decentralized Finance, NFT Finance,
                        </h1>
                        <h1 className="font-Prompt lg:text-4xl md:text-3xl sm:text-2xl font-bold text-slate-300">
                            Social Finance, and other kinds of Dapps building on Testnet, please
                            choose the diresed testnet after connecting your wallet.
                        </h1>

                        <p className="my-5 text-slate-200 text-sm sm:text-xs w-[50vw] lg:w-11/12"></p>

                        <p className="my-5 text-slate-200 text-sm sm:text-xs w-[50vw] lg:w-11/12"></p>
                    </div>
                </div>

                <div>
                    <div className="grid items-center justify-items-center bg-no-repeat bg-cover bg-black  relative">
                        <div className="mt-8 flex items-center">
                            <h1 className=" lg:text-4xl sm:text-xl font-bold text-white text-center">
                                Mint
                            </h1>
                        </div>
                    </div>
                </div>
                <Mintingcomponent />
            </div>
        </div>
    )
}
