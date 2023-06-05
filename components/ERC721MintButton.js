import styles from "../styles/Home.module.css"
import Image from "next/image"
import { useState, useEffect } from "react"
import abiJson from "../constants/erc721abi.json"
import {
    usePrepareContractWrite,
    useAccount,
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi"
import { ethers } from "ethers"
import { useNotification } from "grand-notification"
export default function ERC721MintButton(props) {
    const [price, setprice] = useState(0)
    const [value, setvalue] = useState(0)
    const [mintNum, setmintNum] = useState(0)
    const [mintCountdata, setmintCountdata] = useState(0)
    const { addNotification } = useNotification()
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
            addNotification("Transaction error...", "error",4000)
        }
    }, [minterror])
    useEffect(() => {
        if (mintisLoading) {
            addNotification("minting...", "success",4000)
        }
    }, [mintisLoading])
    useEffect(() => {
        if (mintisSuccess) {
            addNotification("minted successful!", "success",4000)
        }
    }, [mintisSuccess])
    function connectwalletnotice() {
        addNotification("Please connect wallet", "error",4000)
    }
    function zeromintnum() {
        addNotification("Mint number could not be 0", "error",4000)
    }
    function increase() {
        if (mintNum + 1 < 3) {
            if (mintNum >= 2 - mintCountdata) {
                addNotification("Exceed Maximum Mint Number", "error",4000)
            } else {
                setmintNum(mintNum + 1)
                if (mintNum == 1) setprice(ethers.utils.parseEther("0.1"))
            }
        } else {
            addNotification("Exceed Maximum Mint Number", "error",4000)
        }
    }
    function decrease() {
        if (mintNum > 0) {
            setmintNum(mintNum - 1)
            setprice(ethers.utils.parseEther("0.1"))
        }
    }
    useEffect(() => {
        if (mintNum) {
            if (mintNum == 1) {
                setprice(ethers.utils.parseEther("0.1"))
                setvalue("0.1")
            }
            if (mintNum == 2) {
                setprice(ethers.utils.parseEther("0.2"))
                setvalue("0.2")
            }
        }
    }, [mintNum])
    return (
        <div>
            {address && (
                <div>
                    <div className="">You Minted {mintCountdata} / Max Mint Count 2</div>

                    <div className="mt-8 grid grid-cols-3 gap-5 items-center justify-center text-center">
                        <button className={styles.mintButton} onClick={decrease}>
                            -
                        </button>
                        <div className="">{mintNum}</div>
                        <button className={styles.mintButton} onClick={increase}>
                            +
                        </button>
                    </div>
                    <div className="mt-2" />
                    {mintNum == 0 ? (
                        <button className={styles.mintButton} onClick={zeromintnum}>
                            mint
                        </button>
                    ) : (
                        <button className={styles.mintButton} onClick={mint}>
                            You will pay {value} {props.symbol} to mint
                        </button>
                    )}
                    <div className="mt-4 grid grid-cols-2 gap-30">
                        <a href={`${props.scan}${props.contractaddress}`}>
                            <button className="">
                                <Image
                                    src="/etherscan.png"
                                    width="30"
                                    height="30"
                                    title="view on etherscan"
                                ></Image>
                            </button>
                        </a>
                        <a href={`https://testnets.opensea.io/collection/${props.opensea}`}>
                            <button className="">
                                <Image
                                    src="/opensea.png"
                                    width="30"
                                    height="30"
                                    title="view on opensea"
                                ></Image>
                            </button>
                        </a>
                    </div>
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
                    <div className="mt-2" />
                    <button className={styles.mintButton} onClick={connectwalletnotice}>
                        mint
                    </button>
                    <div className="mt-4 grid grid-cols-2 gap-30">
                        <a href={`${props.scan}${props.contractaddress}`}>
                            <button className="">
                                <Image
                                    src="/etherscan.png"
                                    width="30"
                                    height="30"
                                    title="view on etherscan"
                                ></Image>
                            </button>
                        </a>
                        <a href={`https://testnets.opensea.io/collection/${props.opensea}`}>
                            <button className="">
                                <Image
                                    src="/opensea.png"
                                    width="30"
                                    height="30"
                                    title="view on opensea"
                                ></Image>
                            </button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}
