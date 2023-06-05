import { useState, useEffect } from "react"
import ERC721Mintednumber from "./ERC721Mintednumber"
import ERC721MintButton from "./ERC721MintButton"
import ERC1155Mintednumber from "./ERC1155Mintednumber"
import ERC1155MintButton from "./ERC1155MintButton"
import ERC4907MintButton from "./ERC4907MintButton"
import ERC4907Mintednumber from "./ERC4907Mintednumber"
import ERC4907setUserButton from "./ERC4907setUserButton"
import { erc721mumbai } from "../constants/erc721mumbai"
import { erc721goerli } from "../constants/erc721goerli"
import { erc1155goerli } from "../constants/erc1155goerli"
import { erc1155mumbai } from "../constants/erc1155mumbai"
import { erc4907goerli } from "../constants/erc4907goerli"
import { erc4907mumbai } from "../constants/erc4907mumbai"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"
import { useNotification } from "grand-notification"
export default function Mintingcomponent() {
    const { address } = useAccount()
    const { addNotification } = useNotification()
    const { chain } = useNetwork()
    const [collectiontype, setcollectiontype] = useState(1)
    const [chainnow, setchainnow] = useState("")
    const [messagejson, setMessagejson] = useState("")
    const { switchNetwork } = useSwitchNetwork()
    useEffect(() => {
        if (collectiontype == 1) {
            pullerc721Json(erc721goerli)
        }
        if (collectiontype == 2) {
            pullerc1155Json(erc1155goerli)
        }
        if (collectiontype == 3) {
            pullerc4907Json(erc4907goerli)
        }
    }, [])
    useEffect(() => {
        if (chain) {
            if (chain["id"] == 5) {
                if (collectiontype == 1) {
                    pullerc721Json(erc721goerli)
                }
                if (collectiontype == 2) {
                    pullerc1155Json(erc1155goerli)
                }
                if (collectiontype == 3) {
                    pullerc4907Json(erc4907goerli)
                }
            }
            if (chain["id"] == 80001) {
                if (collectiontype == 1) {
                    pullerc721Json(erc721mumbai)
                }
                if (collectiontype == 2) {
                    pullerc1155Json(erc1155mumbai)
                }
                if (collectiontype == 3) {
                    pullerc4907Json(erc4907mumbai)
                }
            }
        }
    }, [chain])
    useEffect(() => {
        if (switchNetwork) {
            setchainnow(chain["id"])
            if (chain["id"] == 5) {
                if (collectiontype == 1) {
                    pullerc721Json(erc721goerli)
                }
                if (collectiontype == 2) {
                    pullerc1155Json(erc1155goerli)
                }
                if (collectiontype == 3) {
                    pullerc4907Json(erc4907goerli)
                }
                // console.log(1)
            }
            if (chain["id"] == 80001) {
                if (collectiontype == 1) {
                    pullerc721Json(erc721mumbai)
                }
                if (collectiontype == 2) {
                    pullerc1155Json(erc1155mumbai)
                }
                if (collectiontype == 3) {
                    pullerc4907Json(erc4907mumbai)
                }
            }
        }
    }, [chain])
    function connectWalletNotification() {
        addNotification(
            "Please Connect Wallet & Choose Right Network Before Proceed!",
            "info",
            4000
        )
    }
    useEffect(() => {
        connectWalletNotification()
    }, [])
    let displayData
    async function pullerc1155Json(e) {
        displayData = await e.map(function (msg) {
            return (
                <div
                    key={msg.id}
                    className="ml-4 mr-4 mt-4 mb-4 text-white font-Prompt border-2 border-white rounded-2xl outline outline-2 outline-offset-4"
                >
                    <div className="ml-4 mr-4 mt-4 mb-4">
                        <div>{msg.name}</div>
                        <div className="flex justify-center items-center">
                            <img src={msg.pic} height="300" width="300"></img>
                        </div>
                        <ERC1155Mintednumber contractaddress={msg.address} chainid={msg.chain} />
                        <ERC1155MintButton
                            address={address}
                            contractaddress={msg.address}
                            chainid={msg.chain}
                            symbol={msg.symbol}
                            scan={msg.scan}
                            opensea={msg.opensea}
                        />
                    </div>
                </div>
            )
        })
        setMessagejson(displayData)
    }
    async function pullerc4907Json(e) {
        displayData = await e.map(function (msg) {
            return (
                <div
                    key={msg.id}
                    className="ml-4 mr-4 mt-4 mb-4 text-white font-Prompt border-2 border-white rounded-2xl outline outline-2 outline-offset-4"
                >
                    <div className="ml-4 mr-4 mt-4 mb-4">
                        <div>{msg.name}</div>
                        <div className="flex justify-center items-center">
                            <img src={msg.pic} height="300" width="300"></img>
                        </div>
                        <ERC4907Mintednumber contractaddress={msg.address} chainid={msg.chain} />
                        <ERC4907MintButton
                            address={address}
                            contractaddress={msg.address}
                            chainid={msg.chain}
                            symbol={msg.symbol}
                            scan={msg.scan}
                            opensea={msg.opensea}
                        />
                        <ERC4907setUserButton
                            address={address}
                            contractaddress={msg.address}
                            chainid={msg.chain}
                        />
                    </div>
                </div>
            )
        })
        setMessagejson(displayData)
    }
    async function pullerc721Json(e) {
        displayData = await e.map(function (msg) {
            return (
                <div
                    key={msg.id}
                    className="ml-4 mr-4 mt-4 mb-4 text-white font-Prompt border-2 border-white rounded-2xl outline outline-2 outline-offset-4"
                >
                    <div className="ml-4 mr-4 mt-4 mb-4">
                        <div>{msg.name}</div>
                        <div className="flex justify-center items-center">
                            <img src={msg.pic} height="300" width="300"></img>
                        </div>
                        <ERC721Mintednumber contractaddress={msg.address} chainid={msg.chain} />
                        <ERC721MintButton
                            address={address}
                            contractaddress={msg.address}
                            chainid={msg.chain}
                            symbol={msg.symbol}
                            scan={msg.scan}
                            opensea={msg.opensea}
                        />
                    </div>
                </div>
            )
        })
        setMessagejson(displayData)
    }

    function refreshPage() {
        window.location.reload(false)
    }
    function viewerc4907() {
        setcollectiontype(3)
        if (chain) {
            if (chain["id"] == 5) {
                pullerc4907Json(erc4907goerli)
            }
            if (chain["id"] == 80001) {
                pullerc4907Json(erc4907mumbai)
            }
        } else {
            pullerc4907Json(erc4907goerli)
        }
    }
    function viewerc1155() {
        setcollectiontype(2)
        if (chain) {
            if (chain["id"] == 5) {
                pullerc1155Json(erc1155goerli)
            }
            if (chain["id"] == 80001) {
                pullerc1155Json(erc1155mumbai)
            }
        } else {
            pullerc1155Json(erc1155goerli)
        }
    }
    function viewerc721() {
        setcollectiontype(1)
        if (chain) {
            if (chain["id"] == 5) {
                pullerc721Json(erc721goerli)
            }
            if (chain["id"] == 80001) {
                pullerc721Json(erc721mumbai)
            }
        } else {
            pullerc721Json(erc721goerli)
        }
    }
    return (
        <div>
            <div>
                <div className="mt-14 mr-4 ml-4 grid lg:gap-0 gap-0 grid-cols-3">
                    <button className="border-white border-2 text-white" onClick={viewerc721}>
                        ERC721 collection
                    </button>
                    <button className="border-white border-2 text-white" onClick={viewerc1155}>
                        ERC1155 collection
                    </button>
                    <button className="border-white border-2 text-white" onClick={viewerc4907}>
                        ERC4097 collection
                    </button>
                </div>
                <div className="mt-8 grid 2xl:grid-cols-3 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-40 items-center justify-center text-center">
                    {messagejson}
                </div>
            </div>
            {/* {collectiontype == 2 && (
                <div className="h-[40vh] top-1 right-0 rounded-md overflow-hidden opacity-100 z-[1500]"></div>
            )} */}
        </div>
    )
}
