import styles from "../styles/Home.module.css"
import { useState, useEffect } from "react"
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import Bottom from "./Bottom"
import Link from "next"
import abiJson from "../constants/erc1155abi.json"
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
import Mintednumber from "./ERC721Mintednumber"
export default function ERC1155MintButton(props) {
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
            value: ethers.utils.parseEther("0.01"),
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
    function mxmintnum() {
        addToast("You have exceed the maximum mint", { appearance: "error" })
    }
    return (
        <div>
            {address && (
                <div>
                    <div className="">You Minted {mintCountdata} / Max Mint Count 2</div>

                    <div className="mt-2" />
                    {mintCountdata != 2 ? (
                        <button className={styles.mintButton} onClick={mint}>
                            You will pay 0.01 {props.symbol} to mint one
                        </button>
                    ) : (
                        <button className={styles.mintButton} onClick={mxmintnum}>
                            Can not mint
                        </button>
                    )}

                    <div className="mt-2" />
                    <a href={`${props.scan}${props.contractaddress}`}>
                        <button className="">view on etherscan</button>
                    </a>
                </div>
            )}
            {!address && (
                <div>
                    <div className="">You Minted ? / Max Mint Count 2</div>

                    <button className={styles.mintButton} onClick={connectwalletnotice}>
                        mint
                    </button>
                    <div className="mt-2" />
                    <a href={`${props.scan}${props.contractaddress}`}>
                        <button className="">view on etherscan</button>
                    </a>
                </div>
            )}
        </div>
    )
}
