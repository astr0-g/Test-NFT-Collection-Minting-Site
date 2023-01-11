import "../styles/globals.css"
import { WagmiConfig, configureChains, createClient, chain } from "wagmi"
import { infuraProvider } from "wagmi/providers/infura"
import { ToastProvider } from "react-toast-notifications"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import { publicProvider } from "wagmi/providers/public"
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
    [chain.goerli, chain.polygonMumbai],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY1 }, { priority: 0 }),
        infuraProvider(process.env.NEXT_PUBLIC_INFURAAPIKEY1, { priority: 1 }),
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMYAPIKEY2 }, { priority: 2 }),
        infuraProvider(process.env.NEXT_PUBLIC_INFURAAPIKEY2, { priority: 3 }),
        publicProvider({ priority: 4 }),
    ]
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
                    <ToastProvider autoDismiss={true} autoDismissTimeout="4000">
                        <Component {...pageProps} name="Access-Control-Allow-Origin" value="*" />
                    </ToastProvider>
                </RainbowKitProvider>
            </WagmiConfig>
        </div>
    )
}

export default MyApp
