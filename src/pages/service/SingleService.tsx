import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { authorizationAxiosInstance } from '../../axios/Axios'

const SingleService = () => {

    const { id } = useParams();

    if (!id) {
        return <div>No service ID provided</div>;
    }

    //Get Single Service Data
    async function getSingleServiceData(id: string) {
        const res = await authorizationAxiosInstance.get(`/admin/service/${id}`)
        return res.data;
    }

    const data = useQuery(["getsingleservicedata", id], () => getSingleServiceData(id));

    const Data = data?.data?.servicedata

    console.log(Data);



    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    {
                        Data && (
                            <>
                                <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                    <h2 className="text-sm title-font text-gray-500 tracking-widest">{Data.provider}</h2>
                                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{Data.service}</h1>
                                    <div className="flex mb-4">
                                        <span className="flex items-center">
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                            <span className="text-gray-600 ml-3">4 Reviews</span>
                                        </span>
                                   
                                    </div>
                                    <p className="leading-relaxed">{Data.description}</p>
                                    <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">

                                    </div>
                                    <div className="flex">
                                        <span className="title-font font-medium text-2xl text-gray-900">Rs{Data.price}</span>
                                        <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy</button>

                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </section>

    )
}

export default SingleService