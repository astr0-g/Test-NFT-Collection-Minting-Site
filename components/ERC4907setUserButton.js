import styles from "../styles/Home.module.css"
import { useState, useEffect } from "react"
import abiJson from "../constants/erc4907abi.json"
import {
    usePrepareContractWrite,
    useAccount,
    useContractRead,
    useContractWrite,
    useWaitForTransaction,
} from "wagmi"
import { useToasts } from "react-toast-notifications"
export default function ERC4907setUserButton(props) {
    const [ready, setready] = useState(0)
    const [rentalToAddress, setRentalToAddress] = useState("")
    const [seconds, setseconds] = useState("")
    const [tokenidtorent, settokenidtorent] = useState("")
    const [secondstorent, setsecondstorent] = useState("")
    const [rentable, setrentable] = useState(Boolean)
    const [totalowned, settotalowned] = useState(0)
    const [day, setday] = useState("")
    const { addToast } = useToasts()
    const { address } = useAccount()
    const { data: walletOfOwner } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainid,
        functionName: "walletOfOwner",
        watch: true,
        args: address,
    })
    const { data: userOf } = useContractRead({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainid,
        functionName: "userOf",
        watch: true,
        args: tokenidtorent,
    })
    useEffect(() => {
        if (walletOfOwner) {
            if (walletOfOwner.length > 1) {
                settotalowned(parseInt(walletOfOwner.length - 1))
                settokenidtorent(walletOfOwner[totalowned].toString())
            }
        }
    }, [walletOfOwner])

    useEffect(() => {
        if (userOf == 0x0000000000000000000000000000000000000000) {
            setrentable(true)
        } else if (userOf != 0x0000000000000000000000000000000000000000 && userOf != undefined) {
            if (userOf == 0x0000000000000000000000000000000000000000) {
                setrentable(true)
            } else {
                if (totalowned >= 1) {
                    settotalowned(totalowned - 1)
                    settokenidtorent(walletOfOwner[totalowned].toString())
                }
            }
        }
    }, [userOf])
    useEffect(() => {
        if (parseInt(seconds)) {
            setsecondstorent(parseInt(Date.now() / 1000) + parseInt(seconds))
        }
    }, [seconds])

    const { config } = usePrepareContractWrite({
        addressOrName: props.contractaddress,
        contractInterface: abiJson.abi,
        chains: props.chainID,
        functionName: "setUser",
        args: [tokenidtorent, rentalToAddress, secondstorent],
    })
    const { data: rentoutresults, write: rentout } = useContractWrite(config)
    const {
        isLoading: rentoutisLoading,
        isError: rentouterror,
        isSuccess: rentoutisSuccess,
    } = useWaitForTransaction({
        hash: rentoutresults?.hash,
    })
    useEffect(() => {
        if (rentouterror) {
            addToast("Transaction error...", { appearance: "error" })
        }
    }, [rentouterror])
    useEffect(() => {
        if (rentoutisLoading) {
            addToast("renting out...", { appearance: "success" })
        }
    }, [rentoutisLoading])
    useEffect(() => {
        if (rentoutisSuccess) {
            addToast("rent out successful!", { appearance: "success" })
        }
    }, [rentoutisSuccess])
    function connectwalletnotice() {
        addToast("Please connect wallet", { appearance: "error" })
    }

    return (
        <div>
            {rentable && (
                <div className="text-white text-bold mt-4 mb-2"> ERC4097 Rental Test Example</div>
            )}
            {rentable && (
                <div className="text-white text-bold text-sm mt-4 mb-2">
                    you have tokenId {tokenidtorent} can be rented out
                </div>
            )}
            {rentable && (
                <div className="text-white text-bold text-sm mt-4 mb-2">
                    please enter address you are renting to
                </div>
            )}
            {rentable && (
                <div className="grid mb-2">
                    <textarea
                        className="border-white border-2 rounded-lg w-full focus:ring-0 text-md  placeholder-white tracking-wide  text-white bg-transparent pl-3 pt-1 text-[12px]"
                        rows="2"
                        placeholder="address"
                        value={rentalToAddress}
                        disabled={ready}
                        onChange={(e) => setRentalToAddress(e.target.value)}
                    ></textarea>
                </div>
            )}
            {rentable && (
                <div className="text-white text-bold text-sm mt-4 mb-2">
                    please enter how long in seconds
                </div>
            )}
            {rentable && (
                <div className="grid mb-6">
                    <textarea
                        className="border-white border-2 rounded-lg w-full focus:ring-0 text-md  placeholder-white tracking-wide  text-white bg-transparent pl-3 pt-1 text-[12px]"
                        rows="1"
                        placeholder="how long you want to rent out in seconds"
                        value={seconds}
                        disabled={ready}
                        onChange={(e) => setseconds(e.target.value)}
                    ></textarea>
                </div>
            )}

            {rentable && (
                <div>
                    <button
                        className={styles.mintButton}
                        onClick={rentout}
                        disabled={rentoutisLoading}
                    >
                        rent out
                    </button>
                </div>
            )}
        </div>
    )
}
