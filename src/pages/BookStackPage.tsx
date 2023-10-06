import Stack from '../components/statistics/Stack'
import MyHeader from '../components/Header/MyHeader'

export default function BookStackPage() {
    return (
        <div>
            <div className="relative z-60">
                <MyHeader />
            </div>
            <Stack />
        </div>
    )
}
