import { PiMagnifyingGlassThin } from "react-icons/pi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useState } from "react";

const popular_cities = [
  "Beijing",
  "Shanghai",
  "Guangzhou",
  "Shenzhen",
  "Chengdu",
  "Chongqing",
  "Tianjin",
  "Wuhan",
  "Hangzhou",
  "Xian",
  "Nanjing",
  "Suzhou",
  "Shenyang",
  "Qingdao",
  "Dalian",
  "Changsha",
  "Harbin",
  "Kunming",
  "Zhengzhou",
]

export default function SideBar({set_data, set_err_msg}: {set_data: Function, set_err_msg: Function}) {

  const [city, set_city] = useState("")
  const [loading, set_loading] = useState(false)

  const on_search = (e: React.FormEvent<HTMLFormElement>, arg_city: string) => {
    e.preventDefault();
    set_loading(true)
    fetch(
      'https://code-test-flask-dot-nextapp-412807.df.r.appspot.com/forecast',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({city: arg_city}),
      }
    ).then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Failed to fetch data")
      }
    }).then((data) => {
      if (data.error) {
        set_data(null)
        set_err_msg(data.error)
        set_loading(false)
        return
      }
      set_data(data)
      set_err_msg("")
      set_loading(false)
    }).catch((err) => {
      set_err_msg(JSON.stringify(err))
      console.error(err)
      set_loading(false)
    })
  }

  return (
    <div className="flex flex-col bg-zinc-800 text-zinc-100 w-full lg:w-1/6 lg:h-screen">
      <div className="flex w-full items-center justify-center py-8" onClick={()=>set_city("")}>
        <TiWeatherPartlySunny className="w-32 h-32 fill-blue-400"/>
      </div>
      <form method="post" onSubmit={(e: any)=>{on_search(e, city)}}>
        <div className="flex flex-row px-4 py-2">
          <input
            type="text"
            placeholder="Enter City Name Here..."
            value={city}
            onChange={(e) => set_city(e.target.value)}
            className="w-10/12 text-white bg-slate-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 rounded-md py-2 px-4"
          />
          <button type="submit" className="w-2/12 flex items-center justify-center" disabled={loading}>
            {
              loading ? (
                <AiOutlineLoading3Quarters className="fill-white w-8 h-8 animate-spin"/>
              ) : (
                <PiMagnifyingGlassThin className="fill-white w-8 h-8 hover:scale-110"/>
              )
            }
          </button>
        </div>
        <div className="grid grid-cols-2 mt-6 mx-2">
          {
            popular_cities.map((popular_city, index) => (
              <div key={index} className="px-4 py-2">
                <button
                  type="button"
                  onClick={(e: any) => {
                    set_city(popular_city)
                    on_search(e, popular_city)
                  }}
                  disabled={loading}
                  className="text-lg hover:border-b hover:border-blue-500 hover:text-blue-500 focus:outline-none transition-all duration-200"
                >
                  {popular_city}
                </button>
              </div>
            ))
          }
        </div>
        <div className="lg:absolute lg:bottom-8 lg:left-12 text-sm text-zinc-500">
          作者: 陈挚 微信号: justjazz903
        </div>
      </form>
    </div>
  );
}