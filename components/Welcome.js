import styles from "../styles/Home.module.css"
import Mintingcomponent from "./Mintingcomponent"
import { useState, useEffect } from "react"
import Bottom from "./Bottom"
import Link from "next"
import { useAccount, useNetwork } from "wagmi"
import { useToasts } from "react-toast-notifications"
export default function Welcome() {
    const { address } = useAccount()
    const { addToast } = useToasts()
    const { chain } = useNetwork()

    const [chainnow, setchainnow] = useState("Goerli")
    useEffect(() => {
        if (chain) {
            if (chain["id"] == 5) {
                setchainnow(chain["name"])
            }
            if (chain["id"] == 80001) {
                setchainnow(chain["name"])
            }
        }
    }, [chain])

    function connectWalletNotification() {
        addToast("Please Connect Wallet & Choose Right Network Before Proceed!", {
            appearance: "warning",
        })
    }
    return (
        <div className="scroll-smooth">
            <div>
                <div className="grid items-center justify-items-center bg-cover bg-black relative">
                    <div className="mt-8 grid items-center justify-items-center text-center opacity-100 ">
                        <h1 className="mt-5 font-Prompt lg:text-8xl md:text-6xl sm:text-4xl font-bold text-white">
                            DISCLAIMER
                        </h1>
                        <h1 className="mt-5 ml-11 mr-11 font-Prompt lg:text-3xl md:text-2xl sm:text-xl font-bold text-white">
                            This is a minting site for mint test NFT from variety of collection
                            that helps decentralized Finance, NFT Finance, social Finance, and
                            other kinds of Dapps building on Testnet, please choose the diresed
                            testnet after connecting your wallet. This is a non-profit website. If
                            this involves your company's copyright issues, please contact me and I
                            will delete it immediately.
                        </h1>
                        <h1 className="font-Prompt lg:text-4xl md:text-3xl sm:text-2xl font-bold text-white"></h1>

                        <p className="my-5 text-slate-200 text-sm sm:text-xs w-[50vw] lg:w-11/12"></p>

                        <p className="my-5 text-slate-200 text-sm sm:text-xs w-[50vw] lg:w-11/12"></p>
                    </div>
                    <div className="grid items-center justify-items-center bg-no-repeat bg-cover  relative">
                        <div className="mt-8 flex items-center">
                            <h1 className="lg:text-4xl sm:text-xl font-bold text-white text-center">
                                MINT TEST NFT on {chainnow}
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
