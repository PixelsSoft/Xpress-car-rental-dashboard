import Layout from '../components/layout.component'
import StatCard from '../components/stat-card.component'
import CustomContainer from '../components/custom-container.component'

export default function Dashboard() {
    return (
        <Layout>

            <CustomContainer otherStyles='flex w-full justify-between items-center p-4 mt-8'>
                <StatCard img={require('../assets/images/car-rent.png')} title='Cars on Rent' stat={20} />
                <StatCard img={require('../assets/images/car-rent.png')} title='Cars on Rent' stat={20} />
                <StatCard img={require('../assets/images/car-rent.png')} title='Cars on Rent' stat={20} />
                <StatCard img={require('../assets/images/car-rent.png')} title='Cars on Rent' stat={20}  border={false} />
            </CustomContainer>
        </Layout>
    )
}