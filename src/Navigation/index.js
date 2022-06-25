import React from 'react'
import { AuthProvider } from './AuthProvider'
import Routes from './Routes'

const RootProviders = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    )
}

export default RootProviders