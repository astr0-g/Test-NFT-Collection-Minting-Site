import "../styles/globals.css"
import { WagmiConfig, configureChains, createClient, chain } from "wagmi"
import { infuraProvider } from "wagmi/providers/infura"
import { ToastProvider } from "react-toast-notifications"
import { alchemyProvider } from "wagmi/providers/alchemy"
import {
    getDefaultWallets,
    RainbowKitProvider,
    darkTheme,
    lightTheme,
} from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { publicProvider } from "wagmi/providers/public"
import {
    injectedWallet,
    argentWallet,
    braveWallet,
    coinbaseWallet,
    ledgerWallet,
    trustWallet,
    imTokenWallet,
    omniWallet,
    metaMaskWallet,
    rainbowWallet,
    walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"
import Head from "next/head"

const NEXT_PUBLIC_Application_ID = process.env.NEXT_PUBLIC_APP_ID
const NEXT_PUBLIC_Dapp_URL = process.env.NEXT_PUBLIC_SERVER_URL
const { chains, provider } = configureChains(
    [/*chain.mainnet,*/ chain.polygon，chain.goerli],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY1 }, { priority: 0 }),
        infuraProvider(process.env.NEXT_PUBLIC_INFURAAPIKEY1, { priority: 1 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY2 }, { priority: 2 }),
        infuraProvider(process.env.NEXT_PUBLIC_INFURAAPIKEY2, { priority: 3 }),
        publicProvider({ priority: 4 }),
    ]
)
// const { connectors } = getDefaultWallets({
//     appName: "My app",
//     chains,
// })
const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            metaMaskWallet({ chains }),
            coinbaseWallet({ chains }),
            trustWallet({ chains }),
            braveWallet({ chains }),
        ],
    },
    {
        groupName: "Others",
        wallets: [
            walletConnectWallet({ chains }),
            ledgerWallet({ chains }),
            argentWallet({ chains }),
            omniWallet({ chains }),
            imTokenWallet({ chains }),
        ],
    },
])

const WagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
})
function MyApp({ Component, pageProps }) {
    return (
        <div>
            <WagmiConfig client={WagmiClient}>
                {/* <SessionProvider refetchInterval={0} session={pageProps.session}>
                        <RainbowKitSiweNextAuthProvider> */}
                <RainbowKitProvider
                    chains={chains}
                    theme={darkTheme({
                        accentColor: "#37383b",
                        accentColorForeground: "white",
                        borderRadius: "large",
                        fontStack: "system",
                    })}
                >
                    <ToastProvider autoDismiss={true} autoDismissTimeout="4000">
                        <Component {...pageProps} name="Access-Control-Allow-Origin" value="*" />
                    </ToastProvider>
                </RainbowKitProvider>
                {/* </RainbowKitSiweNextAuthProvider>
                    </SessionProvider> */}
            </WagmiConfig>
        </div>
    )
}

export default MyApp
