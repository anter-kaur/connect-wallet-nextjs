'use client'
import {useState,useEffect} from 'react';
import { useWeb3Modal, useWalletInfo, useWeb3ModalState, useWeb3ModalTheme } from '@web3modal/wagmi/react'
import { useReadContract, useDisconnect, useAccount } from 'wagmi'

// import { abi } from './abi'

export default function WalletHooks() {
  const [walletName,setWalletName]=useState('');
  // 4. Use modal hook
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()
  const { walletInfo } = useWalletInfo()
  const { address, isConnecting, isDisconnected } = useAccount()
  const { themeMode, themeVariables, setThemeMode, setThemeVariables } = useWeb3ModalTheme()
  const [theme, setTheme] = useState('light')

  
  useEffect(() => {
    if (walletInfo) {
      console.log(walletInfo);
      setWalletName(walletInfo.name)
    }
  }, [walletInfo])

  useEffect(() => {
    setThemeMode(theme)
    setThemeVariables({
      '--w3m-color-mix': '#00BB7F',
      '--w3m-color-mix-strength': 40
    })
  }, [theme, setThemeMode, setThemeVariables])

    const getaddress=()=>{
      if (isConnecting) return <div>Connecting…</div>
  if (isDisconnected) return <div>Disconnected</div>
  return <div>{address}</div>
  }

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    // <div className={classes.btns}>
    <>
      <button onClick={() => open()}>Open Connect Modal</button>
      <button onClick={() => open({ view: 'Networks' })}>Open Network Modal</button>
      <button onClick={() => disconnect()}>Disconnect</button>
      <div>{walletName && !isDisconnected && `Wallet Name: ${walletName}`}</div>
      {getaddress()}
      </>
    // {/* </div> */}
  )
}