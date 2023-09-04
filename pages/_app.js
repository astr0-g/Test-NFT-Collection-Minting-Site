import "../styles/globals.css"
import { WagmiConfig, configureChains, createClient, chain } from "wagmi"
import { infuraProvider } from "wagmi/providers/infura"
import { ToastProvider } from "react-toast-notifications"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import { publicProvider } from "wagmi/providers/public"
import { NotificationProvider } from "grand-notification"
import {
    argentWallet,
    braveWallet,
    coinbaseWallet,
    ledgerWallet,
    trustWallet,
    imTokenWallet,
    omniWallet,
    metaMaskWallet,
    walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"

const { chains, provider } = configureChains(
    [chain.sepolia, chain.goerli, chain.polygonMumbai],
    [
        // publicProvider(),
        jsonRpcProvider({
            rpc: (chain) => ({
                http: process.env.NEXT_PUBLIC_SOPOLIAURL,
            }),
        }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY1, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY2, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY3, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY4, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY5, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY6, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY7, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY8, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY9, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY10, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY11, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY12, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY13, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY14, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY15, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY16, priority: 0 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY17, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY1, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY2, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY3, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY4, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY5, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY6, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY7, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY8, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY9, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY10, priority: 0 }),
        // infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURAAPIKEY11, priority: 0 }),
    ],
    { pollingInterval: 90_000, targetQuorum: 1 },
    { stallTimeout: 1000 }
)

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
                <RainbowKitProvider
                    chains={chains}
                    theme={darkTheme({
                        accentColor: "#37383b",
                        accentColorForeground: "white",
                        borderRadius: "large",
                        fontStack: "system",
                    })}
                >
                    <NotificationProvider>
                        <Component {...pageProps} name="Access-Control-Allow-Origin" value="*" />
                    </NotificationProvider>
                </RainbowKitProvider>
            </WagmiConfig>
        </div>
    )
}

export default MyApp
