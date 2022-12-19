import styles from "../styles/Home.module.css"
import { useState, useEffect } from "react"
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Bottom from "./Bottom"
import Link from "next"
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
import { ethers } from "ethers"
import { useToasts } from "react-toast-notifications"
import Mintednumber from "./Mintednumber"
export default function MintButton(props) {
    const [price, setprice] = useState(0)
    const [value, setvalue] = useState(0)
    const [mintNum, setmintNum] = useState(0)
    const [mintCountdata, setmintCountdata] = useState(0)
    const { addToast } = useToasts()
    const { address } = useAccount()
    const { data: mintCount } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainID,
        functionName: "mintCount",
        watch: true,
        args: props.address,
    })
    useEffect(() => {
        if (mintCount) {
            setmintCountdata(mintCount.toNumber())
        }
    }, [mintCount])

    const { config } = usePrepareContractWrite({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainID,
        functionName: "mint",
        overrides: {
            from: props.address,
            value: price,
        },
        args: mintNum,
    })
    const { data: mintresults, write: mint } = useContractWrite(config)
    const {
        isLoading: mintisLoading,
        isError: minterror,
        isSuccess: mintisSuccess,
    } = useWaitForTransaction({
        hash: mintresults?.hash,
    })
    useEffect(() => {
        if (minterror) {
            addToast("Transaction error...", { appearance: "error" })
        }
    }, [minterror])
    useEffect(() => {
        if (mintisLoading) {
            addToast("minting...", { appearance: "success" })
        }
    }, [mintisLoading])
    useEffect(() => {
        if (mintisSuccess) {
            addToast("minted successful!", { appearance: "success" })
        }
    }, [mintisSuccess])
    function connectwalletnotice() {
        addToast("Please connect wallet", { appearance: "error" })
    }
    function increase() {
        if (mintNum + 1 < 3) {
            if (mintNum >= 2 - mintCountdata) {
                addToast("Exceed Maximum Mint Number", { appearance: "error" })
            } else {
                setmintNum(mintNum + 1)
                if (mintNum == 1) setprice(ethers.utils.parseEther("0.01"))
            }
        } else {
            addToast("Exceed Maximum Mint Number", { appearance: "error" })
        }
    }
    function decrease() {
        if (mintNum > 0) {
            setmintNum(mintNum - 1)
            setprice(ethers.utils.parseEther("0.01"))
        }
    }
    useEffect(() => {
        if (mintNum) {
            if (mintNum == 1) {
                setprice(ethers.utils.parseEther("0.01"))
                setvalue("0.01")
            }
            if (mintNum == 2) {
                setprice(ethers.utils.parseEther("0.02"))
                setvalue("0.02")
            }
        }
    }, [mintNum])
    return (
        <div>
            {address && (
                <div>
                    <div className="">You Minted {mintCountdata} / Max Mint Count 2</div>
                    {mintNum > 0 && (
                        <div className="">
                            You will pay {value} {props.symbol}
                        </div>
                    )}
                    <div className="mt-8  grid grid-cols-3 gap-5 items-center justify-center text-center">
                        <button className={styles.mintButton} onClick={decrease}>
                            -
                        </button>
                        <div className="">{mintNum}</div>
                        <button className={styles.mintButton} onClick={increase}>
                            +
                        </button>
                    </div>
                    <button className={styles.mintButton} onClick={mint}>
                        mint
                    </button>
                    <a href={`${props.scan}${props.contractaddress}`}>
                        <button className={styles.mintButton}>view on etherscan</button>
                    </a>
                </div>
            )}
            {!address && (
                <div>
                    <div className="">You Minted ? / Max Mint Count 2</div>

                    <div className="mt-8  grid grid-cols-3 gap-5 items-center justify-center text-center">
                        <button className={styles.mintButton} onClick={connectwalletnotice}>
                            -
                        </button>
                        <div className="">{mintNum}</div>
                        <button className={styles.mintButton} onClick={connectwalletnotice}>
                            +
                        </button>
                    </div>
                    <button className={styles.mintButton} onClick={connectwalletnotice}>
                        mint
                    </button>
                    <a href={`${props.scan}${props.contractaddress}`}>
                        <button className={styles.mintButton}>view on etherscan</button>
                    </a>
                </div>
            )}
        </div>
    )
}
