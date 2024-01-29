import { Link } from "react-router-dom"

const Error = () => {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 py-24 justify-center items-center">

          <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Page Error Found !!</h1>
            <Link to={"/"} className="bg-gray-100 inline-flex py-3 px-5 rounded-lg items-center ml-4 hover:bg-gray-200 focus:outline-none">
              <span className="title-font font-medium"> GO BACK </span>

            </Link>



          </div>
        </div>
      </section>

    </>
  )
}

export default Error