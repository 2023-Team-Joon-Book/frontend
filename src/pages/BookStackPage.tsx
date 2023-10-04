import React from 'react'
import Stack from '../components/statistics/Stack'
import Header from '../components/main/Header'

export default function BookStackPage() {
    return (
        <div>
            <div className="relative z-60">
                <Header />
            </div>
            <Stack />
        </div>
    )
}
