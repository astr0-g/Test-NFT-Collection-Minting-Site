import styles from "../styles/Home.module.css"
import Image from "next/image"
import { useState, useEffect } from "react"
import abiJson from "../constants/erc1155abi.json"
import {
    usePrepareContractWrite,
    useAccount,
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi"
import { ethers } from "ethers"
import { useNotification } from "grand-notification"
export default function ERC1155MintButton(props) {
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
            value: ethers.utils.parseEther("0.1"),
        },
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
            addNotification("Transaction error...", "error", 4000)
        }
    }, [minterror])
    useEffect(() => {
        if (mintisLoading) {
            addNotification("minting...", "success", 4000)
        }
    }, [mintisLoading])
    useEffect(() => {
        if (mintisSuccess) {
            addNotification("minted successful!", "success", 4000)
        }
    }, [mintisSuccess])
    function connectwalletnotice() {
        addNotification("Please connect wallet", "error", 4000)
    }
    function mxmintnum() {
        addNotification("You have exceed the maximum mint", "error", 4000)
    }
    return (
        <div>
            {address && (
                <div>
                    <div className="">You Minted {mintCountdata} / Max Mint Count 2</div>

                    <div className="mt-2" />
                    {mintCountdata != 2 ? (
                        <button className={styles.mintButton} onClick={mint}>
                            You will pay 0.1 {props.symbol} to mint one
                        </button>
                    ) : (
                        <button className={styles.mintButton} onClick={mxmintnum}>
                            maximum minted
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
