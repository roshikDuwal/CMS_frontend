import { useQuery } from "react-query";
import { AxiosInstance } from "../../axios/Axios";
import { Link } from "react-router-dom";


interface elemProps{
  description:string;
  price:string;
  provider:string;
  service:string;
  _id:string;
}

const Service = () => {

  //Get Service
  async function getservice() {
    const res =await AxiosInstance.get("/service");
    return res
  }

  const serviceData = useQuery("servicedata", getservice)

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {
              serviceData?.data?.data?.data && serviceData?.data?.data?.data.map((elem:elemProps) => {
                return (
                  <div key={elem._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                    <Link to={`/service/${elem._id}`} className="block relative h-48 rounded overflow-hidden">
                      <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
                    </Link>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{elem.provider}</h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">{elem.service}</h2>
                      <h2 className="text-gray-900 title-font text-sm font-medium">{elem.description}</h2>
                      <p className="mt-1">Rs{elem.price}</p>
                    </div>
                  </div>
                )
              })

            }

          </div>
        </div>
      </section>

    </>
  )
}

export default Service