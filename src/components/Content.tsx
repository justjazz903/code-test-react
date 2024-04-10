import { BsCloudRainHeavy } from "react-icons/bs"
import { BsSnow } from "react-icons/bs"

export default function Content({data, err_msg}: {data: any, err_msg: string}) {
    const get_hourly_forecast = () => {
      let res = []
      let current_hour = new Date().getHours()
      while (current_hour < 24 && res.length < 6) {
        res.push({
          ...data.forecast.forecastday[0].hour[current_hour],
          hour: current_hour,
        })
        current_hour++;
      }
      let i = 0
      while (res.length < 6) {
        res.push({
          ...data.forecast.forecastday[1].hour[i],
          hour: i,
        });
        i++;
      }
      return res
    }
  return (
    <div className='flex flex-col lg:w-5/6 lg:h-screen items-center justify-center bg-blue-400'>
      {
        data ? (
          <div className="flex flex-col items-center justify-center my-16 space-y-2 lg:space-y-6">
            <p className="text-white text-4xl lg:text-8xl font-thin">
              {data.location.name}
            </p>
            <p className="text-white text-2xl lg:text-6xl font-thin">
              {data.current.temp_c}°C
            </p>
            <p className="text-white texxt-2xl lg:text-4xl">
              {data.current.condition.text}
            </p>
            <p className="text-white text-lg lg:text-2xl">
              H:{data.forecast.forecastday[0].day.maxtemp_c}°C L:{data.forecast.forecastday[0].day.mintemp_c}°C
            </p>
            <div className="flex flex-row flex-wrap border border-opacity-70 rounded-md mx-4">
              {
                get_hourly_forecast().map((hour, index) => {
                  return (
                    <div key={`hour-${index}`} className="flex flex-col px-4 py-2 items-center justify-center text-white">
                      <p className="text-sm lg:text-xl font-bold">{index === 0 ? "Now" : `${hour.hour}`.padStart(2, '0')}</p>
                      <p className="text-sm lg:text-xl">{hour.temp_c}°C</p>
                      <div className="flex flex-row items-center justify-center space-x-1">
                        <BsCloudRainHeavy />
                        <p className="text-sm lg:text-xl">{`${hour.chance_of_rain}%`}</p>
                      </div>
                      <div className="flex flex-row items-center justify-center space-x-1">
                        <BsSnow />
                        <p className="text-sm lg:text-xl">{`${hour.chance_of_snow}%`}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        ) : <p className="text-white text-4xl">{err_msg}</p>
      }
    </div>
  )
}